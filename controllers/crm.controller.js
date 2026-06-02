/**
 * =============================================================================
 *  CRM CONTROLLER — admin.poslatino.com
 *  API interna exclusiva para SIMIDS CRM
 *  Protegida con token secreto (CRM_SECRET_TOKEN en .env)
 * =============================================================================
 */
const { response } = require('express');
const Invoice = require('../models/invoices.model');
const Client = require('../models/clients.model');
const Datos = require('../models/datos.model');
const { createInvoicePDF } = require('../helpers/createPdfInvoice');
const path = require('path');
const fs = require('fs');
const Dataico = require('../models/dataico.model');
const fetch = (...args) =>
    import ('node-fetch').then(({ default: fetch }) => fetch(...args));

/**
 * Limpia y normaliza el NIT para Dataico
 */
const cleanNIT = (identification, type) => {
    if (!identification) return '';
    const limpio = identification.toString().replace(/[\s.]/g, '');
    if (type === 'NIT') {
        const partes = limpio.split('-');
        if (partes.length === 2) {
            return partes[0].trim();
        }
        const soloDigitos = limpio.replace(/\D/g, '');
        if (soloDigitos.length >= 10) {
            return soloDigitos.slice(0, -1);
        }
        return soloDigitos;
    }
    return limpio.replace(/[-]/g, '');
};

/**
 * Normaliza un NIT: quita puntos, guiones, espacios y dígito de verificación
 * Ej: "900.123.456-7" → { base: "900123456", digito: "7" }
 *     "9001234567"    → { base: "900123456", digito: "7" }
 *     "900123456"     → { base: "900123456", digito: null }
 */
const normalizarNIT = (nit) => {
    if (!nit) return { base: null, digito: null };
    const limpio = nit.toString().replace(/[\s.]/g, ''); // quitar puntos y espacios
    const partes = limpio.split('-');
    if (partes.length === 2) {
        return { base: partes[0].trim(), digito: partes[1].trim() };
    }
    // Sin guión: si tiene 10 dígitos, el último es el dígito de verificación
    const soloDigitos = limpio.replace(/\D/g, '');
    if (soloDigitos.length >= 10) {
        return { base: soloDigitos.slice(0, -1), digito: soloDigitos.slice(-1) };
    }
    return { base: soloDigitos, digito: null };
};

/**
 * GET /api/crm/info
 * Info básica del sistema admin (para verificar conexión)
 */
const getInfo = async (req, res = response) => {
    try {
        const datos = await Datos.findOne({});
        res.json({
            ok: true,
            sistema: 'admin.poslatino.com',
            empresa: datos ? datos.name : 'SIMIDS Admin',
            nit_empresa: datos ? datos.nit : null,
            version: '1.0.0'
        });
    } catch (error) {
        console.error('[CRM] Error en getInfo:', error);
        res.status(500).json({ ok: false, msg: 'Error interno' });
    }
};

/**
 * GET /api/crm/facturas?nit=900123456
 * Busca facturas de un cliente por NIT
 * El NIT se normaliza para hacer match flexible
 */
const getFacturasByNIT = async (req, res = response) => {
    const { nit, desde = 0, limite = 50 } = req.query;

    if (!nit) {
        return res.status(400).json({ ok: false, msg: 'El parámetro nit es obligatorio' });
    }

    try {
        const { base } = normalizarNIT(nit);

        // Buscar clientes que tengan este NIT en party_identification o cedula
        // Hacemos búsqueda flexible: el NIT puede estar con o sin dígito de verificación
        const nitRegex = new RegExp(`^${base}`, 'i');

        const clientes = await Client.find({
            $or: [
                { party_identification: nitRegex },
                { cedula: nitRegex }
            ]
        }).select('_id name party_identification cedula');

        if (clientes.length === 0) {
            return res.json({
                ok: true,
                facturas: [],
                total: 0,
                cliente: null,
                msg: 'No se encontró ningún cliente con ese NIT en admin'
            });
        }

        const clienteIds = clientes.map(c => c._id);

        // Buscar facturas de esos clientes
        const [facturas, total] = await Promise.all([
            Invoice.find({ client: { $in: clienteIds }, status: true })
                .populate('client', 'name party_identification cedula email phone')
                .populate('products.product', 'name code')
                .select('invoice fecha amount base iva type payments credito electronica prefix number cufe pdf_url nota products client status')
                .sort({ invoice: -1 })
                .skip(Number(desde))
                .limit(Number(limite)),
            Invoice.countDocuments({ client: { $in: clienteIds }, status: true })
        ]);

        // Mapear para devolver datos limpios al CRM
        const facturasMapped = facturas.map(f => ({
            id: f.iid || f._id,
            numero: f.invoice,
            fecha: f.fecha,
            monto: f.amount,
            base: f.base,
            iva: f.iva,
            tipo_pago: f.type,
            nota: f.nota || '',
            es_credito: f.credito || false,
            es_electronica: f.electronica || false,
            prefijo: f.prefix || '',
            numero_dian: f.number || '',
            cufe: f.cufe || '',
            pdf_url: f.pdf_url || null,
            productos: (f.products || []).map(p => ({
                nombre: p.product ? p.product.name : 'Producto',
                codigo: p.product ? p.product.code : '',
                cantidad: p.qty,
                precio: p.price
            })),
            cliente: f.client ? {
                nombre: f.client.name,
                nit: f.client.party_identification || f.client.cedula,
                email: f.client.email,
                telefono: f.client.phone
            } : null
        }));

        res.json({
            ok: true,
            facturas: facturasMapped,
            total,
            clientes_encontrados: clientes.length,
            nit_buscado: base
        });

    } catch (error) {
        console.error('[CRM] Error en getFacturasByNIT:', error);
        res.status(500).json({ ok: false, msg: 'Error interno al buscar facturas' });
    }
};

/**
 * GET /api/crm/facturas/:id/pdf
 * Devuelve el PDF de una factura específica
 */
const getFacturaPDF = async (req, res = response) => {
    const { id } = req.params;

    try {
        const factura = await Invoice.findById(id)
            .populate('client')
            .populate('products.product', 'name taxid code type tax')
            .populate('user', 'name');

        if (!factura) {
            return res.status(404).json({ ok: false, msg: 'Factura no encontrada' });
        }

        // Si ya tiene PDF generado y existe en disco, lo devolvemos
        if (factura.pdf_url) {
            const pdfPath = path.join(__dirname, '..', factura.pdf_url);
            if (fs.existsSync(pdfPath)) {
                return res.sendFile(pdfPath);
            }
        }

        // Si no, generamos el PDF on-demand
        const datos = await Datos.findOne({});
        const pdfBuffer = await createInvoicePDF(factura, datos);

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename="factura-${factura.invoice}.pdf"`);
        res.send(pdfBuffer);

    } catch (error) {
        console.error('[CRM] Error en getFacturaPDF:', error);
        res.status(500).json({ ok: false, msg: 'Error al generar PDF' });
    }
};

/**
 * POST /api/crm/facturas/mensualidad
 * Crea una factura de mensualidad cloud desde el CRM
 * Body: { nit, nombre_cliente, monto, descripcion, mes, año, metodo_pago }
 */
const crearFacturaMensualidad = async (req, res = response) => {
    const {
        nit,
        nombre_cliente,
        monto,
        descripcion,
        mes,
        anio,
        metodo_pago = 'transferencia',
        generar_electronica = false
    } = req.body;

    if (!nit || !monto || !mes || !anio) {
        return res.status(400).json({
            ok: false,
            msg: 'Campos obligatorios: nit, monto, mes, anio'
        });
    }

    try {
        const { base: nitBase } = normalizarNIT(nit);
        const nitRegex = new RegExp(`^${nitBase}`, 'i');

        // Buscar el cliente en admin
        let cliente = await Client.findOne({
            $or: [
                { party_identification: nitRegex },
                { cedula: nitRegex }
            ]
        });

        // Si no existe el cliente en admin, lo creamos con los datos básicos
        if (!cliente) {
            cliente = new Client({
                name: nombre_cliente || `Cliente ${nitBase}`,
                party_identification: nitBase,
                cedula: nitBase,
                party_type: 'PERSONA_JURIDICA',
                party_identification_type: 'NIT',
                tax_level_code: 'NO_RESPONSABLE_DE_IVA'
            });
            await cliente.save();
        }

        const nombreMes = ['Enero','Febrero','Marzo','Abril','Mayo','Junio',
                           'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
        const descFactura = descripcion || `Mensualidad Cloud SIMIDS - ${nombreMes[mes - 1]} ${anio}`;

        // Crear la factura en admin
        // Nota: products requiere ObjectId de un producto real.
        // Para mensualidades cloud usamos un producto especial "SERVICIO CLOUD"
        // o simplemente registramos como factura de servicio sin producto en inventario
        const nuevaFactura = new Invoice({
            client: cliente._id,
            amount: monto,
            base: monto,
            iva: 0,
            cost: 0,
            tip: 0,
            type: metodo_pago,
            nota: descFactura,
            ocasional: false,
            credito: true, // Fase 5A: Creada a crédito (como cotización/pendiente)
            credit: true,
            status: true,
            electronica: generar_electronica,
            venta: 'Cloud',
            payments: [], // Fase 5A: Sin pagos registrados al momento de la creación
            products: [],
            fecha: new Date()
        });

        await nuevaFactura.save();

        // Poblar para la respuesta
        const facturaCreada = await Invoice.findById(nuevaFactura._id)
            .populate('client', 'name party_identification cedula email phone');

        res.json({
            ok: true,
            msg: 'Factura de mensualidad creada exitosamente',
            factura: {
                id: facturaCreada._id,
                numero: facturaCreada.invoice,
                fecha: facturaCreada.fecha,
                monto: facturaCreada.amount,
                descripcion: facturaCreada.nota,
                cliente: {
                    nombre: facturaCreada.client.name,
                    nit: facturaCreada.client.party_identification || facturaCreada.client.cedula
                }
            }
        });

    } catch (error) {
        console.error('[CRM] Error en crearFacturaMensualidad:', error);
        res.status(500).json({ ok: false, msg: 'Error al crear factura de mensualidad' });
    }
};

/**
 * GET /api/crm/clientes/buscar?nit=900123456
 * Busca si un cliente existe en admin por NIT
 */
const buscarClientePorNIT = async (req, res = response) => {
    const { nit } = req.query;

    if (!nit) {
        return res.status(400).json({ ok: false, msg: 'El parámetro nit es obligatorio' });
    }

    try {
        const { base } = normalizarNIT(nit);
        const nitRegex = new RegExp(`^${base}`, 'i');

        const cliente = await Client.findOne({
            $or: [
                { party_identification: nitRegex },
                { cedula: nitRegex }
            ]
        }).select('name party_identification cedula email phone city address party_type party_identification_type');

        res.json({
            ok: true,
            encontrado: !!cliente,
            cliente: cliente ? {
                id: cliente._id,
                nombre: cliente.name,
                nit: cliente.party_identification || cliente.cedula,
                nit_base: base,
                email: cliente.email,
                telefono: cliente.phone,
                ciudad: cliente.city,
                direccion: cliente.address,
                tipo_persona: cliente.party_type,
                tipo_documento: cliente.party_identification_type
            } : null
        });

    } catch (error) {
        console.error('[CRM] Error en buscarClientePorNIT:', error);
        res.status(500).json({ ok: false, msg: 'Error interno' });
    }
};

/**
 * PUT /api/crm/facturas/:id/pagar
 * Marca una factura a crédito como pagada, agregando el método de pago
 * Body: { metodo_pago }
 */
const marcarFacturaPagada = async (req, res = response) => {
    const { id } = req.params;
    const { metodo_pago = 'transferencia' } = req.body;

    try {
        const factura = await Invoice.findById(id);

        if (!factura) {
            return res.status(404).json({ ok: false, msg: 'Factura no encontrada' });
        }

        // Marcar crédito como pagado
        factura.credito = false;
        factura.credit = false;
        factura.type = metodo_pago;
        factura.fechaCredito = new Date(); // Registramos la fecha de pago del crédito

        // Agregar el pago al array
        factura.payments = [{
            type: metodo_pago,
            amount: factura.amount,
            description: factura.nota || 'Pago mensualidad cloud'
        }];

        await factura.save();

        res.json({
            ok: true,
            msg: 'Factura marcada como pagada exitosamente',
            factura: {
                id: factura._id,
                numero: factura.invoice,
                credito: factura.credito,
                metodo_pago: factura.type,
                fecha_pago: factura.fechaCredito
            }
        });

    } catch (error) {
        console.error('[CRM] Error en marcarFacturaPagada:', error);
        res.status(500).json({ ok: false, msg: 'Error al marcar factura como pagada' });
    }
};

/**
 * POST /api/crm/facturas/:id/enviar-dian
 * Emite una factura a la DIAN a través de Dataico
 */
const emitirFacturaElectronica = async (req, res = response) => {
    const { id } = req.params;

    try {
        const factura = await Invoice.findById(id).populate('client');

        if (!factura) {
            return res.status(404).json({ ok: false, msg: 'Factura no encontrada' });
        }

        const dataicoDB = await Dataico.find();
        const dataico = dataicoDB[0];

        if (!dataico) {
            return res.status(400).json({ ok: false, msg: 'La configuración de Dataico no existe en admin' });
        }

        const client = factura.client;
        let customer = {
            department: dataico.department || '11',
            city: dataico.city || '001',
            address_line: 'No aplica',
            party_type: 'PERSONA_NATURAL',
            tax_level_code: 'NO_RESPONSABLE_DE_IVA',
            email: dataico.email || '',
            country_code: 'CO',
            first_name: 'Consumidor',
            family_name: 'Final',
            phone: dataico.phone || '',
            party_identification_type: 'CC',
            company_name: '',
            regimen: 'SIMPLE',
            party_identification: '222222222222'
        };

        if (client) {
            customer = {
                department: client.codigodepartamento || dataico.department || '11',
                city: client.codigociudad || dataico.city || '001',
                address_line: client.address || 'No aplica',
                party_type: client.party_type || 'PERSONA_NATURAL',
                tax_level_code: client.tax_level_code || 'NO_RESPONSABLE_DE_IVA',
                email: client.email || dataico.email || '',
                country_code: client.country_code || 'CO',
                first_name: client.first_name || '',
                phone: client.phone || dataico.phone || '',
                party_identification_type: client.party_identification_type || 'CC',
                company_name: client.company_name || '',
                family_name: client.family_name || '',
                regimen: client.regimen || 'SIMPLE',
                party_identification: cleanNIT(client.party_identification || client.cedula || '', client.party_identification_type || 'CC')
            };

            if (customer.party_type === 'PERSONA_JURIDICA') {
                delete customer.first_name;
                delete customer.family_name;
                if (!customer.company_name) {
                    customer.company_name = client.name;
                }
            } else {
                delete customer.company_name;
                if (!customer.first_name) {
                    const parts = (client.name || '').split(' ');
                    customer.first_name = parts[0] || 'Cliente';
                    customer.family_name = parts.slice(1).join(' ') || 'Cloud';
                }
            }
        }

        // Construir items
        const items = [];
        if (factura.products && factura.products.length > 0) {
            const facturaConProd = await Invoice.findById(id)
                .populate({
                    path: 'products.product',
                    model: 'Product',
                    populate: {
                        path: 'taxid',
                        model: 'Tax',
                    }
                });

            for (const p of facturaConProd.products) {
                if (p.product) {
                    const impuesto = p.product.taxid;
                    const taxes = [];
                    if (impuesto) {
                        taxes.push({
                            "tax-category": impuesto.taxcategory || '01',
                            "tax-rate": impuesto.valor || 0
                        });
                    }
                    let type = '94';
                    if (p.product.type === 'Granel') {
                        type = 'AB';
                    } else if (p.product.type === 'Paquete') {
                        type = 'PA';
                    }
                    items.push({
                        sku: p.product.code || '01',
                        quantity: p.qty,
                        price: p.price,
                        description: p.product.name,
                        taxes: taxes,
                        "measuring-unit": type
                    });
                }
            }
        }

        if (items.length === 0) {
            items.push({
                sku: 'cloud-simids',
                quantity: 1,
                price: factura.amount,
                description: factura.nota || 'Mensualidad Cloud SIMIDS',
                taxes: [],
                "measuring-unit": '94'
            });
        }

        // Formatear fecha (DD/MM/YYYY)
        const d = new Date();
        let fDay = d.getDate();
        let fMonth = d.getMonth() + 1;
        const fYear = d.getFullYear();
        if (fDay < 10) fDay = `0${fDay}`;
        if (fMonth < 10) fMonth = `0${fMonth}`;
        const fecha = `${fDay}/${fMonth}/${fYear}`;

        const actions = { ...dataico.actions };
        if (actions._doc) {
            delete actions._doc._id;
            if (actions._doc.attachments) {
                actions.attachments = actions._doc.attachments.map(att => {
                    const a = { ...att };
                    if (a._doc) delete a._doc._id;
                    else delete a._id;
                    return a;
                });
            }
        } else {
            delete actions._id;
        }
        actions.send_email = true;

        const numbering = { ...dataico.numbering };
        if (numbering._doc) {
            delete numbering._doc._id;
        } else {
            delete numbering._id;
        }

        const dataicoInvoice = {
            issue_date: fecha,
            invoice_type_code: dataico.invoice_type_code || 'FACTURA_VENTA',
            items: items,
            payment_means_type: 'DEBITO',
            number: factura.invoice.toString(),
            numbering: numbering,
            dataico_account_id: dataico.dataico_account_id,
            payment_date: fecha,
            env: dataico.env || 'PRODUCCION',
            customer: customer,
            payment_means: 'DEBIT_CARD'
        };

        const payload = {
            actions: actions,
            invoice: dataicoInvoice
        };

        // Double-POST strategy
        const token = dataico.authtoken;
        const prefix = dataico.numbering.prefix;

        payload.invoice.number = Number(dataico.hasta + 1).toString();

        let responseOne = await fetch(`https://api.dataico.com/dataico_api/v2/invoices`, {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                "auth-token": token,
                "Content-Type": "application/json"
            }
        });

        let status = responseOne.status;
        let dataicoRes = await responseOne.json();

        if (status !== 201) {
            if (dataicoRes.errors && dataicoRes.errors[0] && dataicoRes.errors[0].error) {
                const errorMsg = dataicoRes.errors[0].error.toString();
                const parts = errorMsg.split("'");
                if (parts.length > 3) {
                    let numero = parts[3];
                    payload.invoice.number = numero;

                    const responseTwo = await fetch(`https://api.dataico.com/dataico_api/v2/invoices`, {
                        method: 'POST',
                        body: JSON.stringify(payload),
                        headers: {
                            "auth-token": token,
                            "Content-Type": "application/json"
                        }
                    });

                    status = responseTwo.status;
                    dataicoRes = await responseTwo.json();
                }
            }
        }

        if (Number(status) !== 201 || !dataicoRes.cufe) {
            await Invoice.findByIdAndUpdate(id, { electronica: true, send: false }, { new: true, useFindAndModify: false });
            return res.status(400).json({
                ok: false,
                msg: 'No se pudo emitir la factura a la DIAN a través de Dataico',
                errors: dataicoRes.errors || dataicoRes
            });
        } else {
            await Invoice.findByIdAndUpdate(id, {
                pdf_url: dataicoRes.pdf_url,
                cufe: dataicoRes.cufe,
                uuid: dataicoRes.uuid,
                number: dataicoRes.number,
                electronica: true,
                prefix: prefix,
                send: true
            }, { new: true, useFindAndModify: false });

            return res.json({
                ok: true,
                msg: 'Factura electrónica emitida exitosamente',
                cufe: dataicoRes.cufe,
                pdf_url: dataicoRes.pdf_url,
                number: dataicoRes.number,
                prefix: prefix
            });
        }

    } catch (error) {
        console.error('[CRM] Error en emitirFacturaElectronica:', error);
        res.status(500).json({ ok: false, msg: 'Error interno al emitir factura electrónica' });
    }
};

/**
 * GET /api/crm/facturas/todas
 * Obtiene todas las facturas registradas en el Admin (por defecto de tipo Cloud o paginadas)
 */
const getTodasFacturas = async (req, res = response) => {
    const { desde = 0, limite = 1000, venta = 'Cloud' } = req.query;

    try {
        const query = { status: true };
        if (venta) {
            query.venta = venta;
        }

        const [facturas, total] = await Promise.all([
            Invoice.find(query)
                .populate('client', 'name party_identification cedula email phone')
                .select('invoice fecha amount base iva type payments credito electronica prefix number cufe pdf_url nota client status venta')
                .sort({ invoice: -1 })
                .skip(Number(desde))
                .limit(Number(limite)),
            Invoice.countDocuments(query)
        ]);

        const facturasMapped = facturas.map(f => ({
            id: f._id,
            numero: f.invoice,
            fecha: f.fecha,
            monto: f.amount,
            base: f.base,
            iva: f.iva,
            tipo_pago: f.type,
            nota: f.nota || '',
            es_credito: f.credito || false,
            es_electronica: f.electronica || false,
            prefijo: f.prefix || '',
            numero_dian: f.number || '',
            cufe: f.cufe || '',
            pdf_url: f.pdf_url || null,
            venta: f.venta,
            cliente: f.client ? {
                id: f.client._id,
                nombre: f.client.name,
                nit: f.client.party_identification || f.client.cedula,
                email: f.client.email,
                telefono: f.client.phone
            } : null
        }));

        res.json({
            ok: true,
            facturas: facturasMapped,
            total
        });

    } catch (error) {
        console.error('[CRM] Error en getTodasFacturas:', error);
        res.status(500).json({ ok: false, msg: 'Error al obtener todas las facturas' });
    }
};

/**
 * GET /api/crm/clientes/todos
 * Obtiene todos los clientes registrados en la base de datos de administración
 */
const getTodosClientes = async (req, res = response) => {
    try {
        const clientes = await Client.find({ status: true })
            .select('name party_identification cedula email phone address city party_type party_identification_type');

        const clientesMapped = clientes.map(c => ({
            id: c._id,
            nombre: c.name,
            nit: c.party_identification || c.cedula,
            email: c.email,
            telefono: c.phone,
            direccion: c.address,
            ciudad: c.city,
            tipo_persona: c.party_type,
            tipo_documento: c.party_identification_type
        }));

        res.json({
            ok: true,
            clientes: clientesMapped,
            total: clientesMapped.length
        });

    } catch (error) {
        console.error('[CRM] Error en getTodosClientes:', error);
        res.status(500).json({ ok: false, msg: 'Error al obtener todos los clientes' });
    }
};

module.exports = {
    getInfo,
    getFacturasByNIT,
    getFacturaPDF,
    crearFacturaMensualidad,
    buscarClientePorNIT,
    normalizarNIT,
    marcarFacturaPagada,
    emitirFacturaElectronica,
    getTodasFacturas,
    getTodosClientes
};
