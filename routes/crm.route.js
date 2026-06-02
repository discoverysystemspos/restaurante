/**
 * =============================================================================
 *  CRM ROUTE — admin.poslatino.com
 *  Rutas exclusivas para integración con SIMIDS CRM
 *  Autenticación: token secreto en header Authorization
 *  NO usa JWT del sistema normal — usa CRM_SECRET_TOKEN del .env
 * =============================================================================
 */
const { Router } = require('express');
const {
    getInfo,
    getFacturasByNIT,
    getFacturaPDF,
    crearFacturaMensualidad,
    buscarClientePorNIT,
    marcarFacturaPagada,
    emitirFacturaElectronica,
    getTodasFacturas,
    getTodosClientes
} = require('../controllers/crm.controller');

const router = Router();

/**
 * Middleware de autenticación CRM
 * Verifica que el header Authorization contenga el token secreto compartido
 */
const validarCRMToken = (req, res, next) => {
    const authHeader = req.headers['authorization'] || req.headers['x-crm-token'];

    if (!authHeader) {
        return res.status(401).json({ ok: false, msg: 'Token CRM requerido' });
    }

    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader;

    if (!process.env.CRM_SECRET_TOKEN) {
        console.error('[CRM] CRM_SECRET_TOKEN no está configurado en .env');
        return res.status(500).json({ ok: false, msg: 'CRM no configurado en servidor' });
    }

    if (token !== process.env.CRM_SECRET_TOKEN) {
        return res.status(403).json({ ok: false, msg: 'Token CRM inválido' });
    }

    next();
};

// ─── RUTAS ────────────────────────────────────────────────────────────────────

/**
 * GET /api/crm/info
 * Verifica conexión y devuelve info del sistema admin
 */
router.get('/info', validarCRMToken, getInfo);

/**
 * GET /api/crm/facturas/todas
 * Consulta todas las facturas del sistema (filtradas por Cloud por defecto)
 */
router.get('/facturas/todas', validarCRMToken, getTodasFacturas);

/**
 * GET /api/crm/facturas?nit=900123456&desde=0&limite=50
 * Consulta facturas de un cliente por NIT
 */
router.get('/facturas', validarCRMToken, getFacturasByNIT);

/**
 * GET /api/crm/facturas/:id/pdf
 * Descarga o genera el PDF de una factura
 */
router.get('/facturas/:id/pdf', validarCRMToken, getFacturaPDF);

/**
 * POST /api/crm/facturas/mensualidad
 * Crea una factura de mensualidad cloud
 * Body: { nit, nombre_cliente, monto, descripcion, mes, anio, metodo_pago, generar_electronica }
 */
router.post('/facturas/mensualidad', validarCRMToken, crearFacturaMensualidad);

/**
 * GET /api/crm/clientes/todos
 * Lista todos los clientes registrados en admin
 */
router.get('/clientes/todos', validarCRMToken, getTodosClientes);

/**
 * GET /api/crm/clientes/buscar?nit=900123456
 * Busca si un cliente existe en admin por NIT
 */
router.get('/clientes/buscar', validarCRMToken, buscarClientePorNIT);

/**
 * PUT /api/crm/facturas/:id/pagar
 * Marca una factura a crédito como pagada
 */
router.put('/facturas/:id/pagar', validarCRMToken, marcarFacturaPagada);

/**
 * POST /api/crm/facturas/:id/enviar-dian
 * Emite una factura a la DIAN vía Dataico
 */
router.post('/facturas/:id/enviar-dian', validarCRMToken, emitirFacturaElectronica);

module.exports = router;
