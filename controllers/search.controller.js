const { response } = require('express');

const User = require('../models/users.model');
const Client = require('../models/clients.model');
const Department = require('../models/departments.model');
const Product = require('../models/products.model');
const Caja = require('../models/cajas.model');
const Mesa = require('../models/mesas.model');
const Invoice = require('../models/invoices.model');
const LogProducts = require('../models/log.products.model');
const Categoria = require('../models/categorias.model');

/** =====================================================================
 *  SEARCH FOR TABLE
=========================================================================*/
const search = async(req, res = response) => {

    const busqueda = req.params.busqueda;
    const tabla = req.params.tabla;
    const regex = new RegExp(busqueda, 'i');
    const desde = req.query.desde;
    const hasta = req.query.hasta;
    let status = req.query.status || false;

    let data = [];
    let total;

    console.log(status);

    switch (tabla) {

        case 'users':

            // data = await User.find({ name: regex });
            [data, total] = await Promise.all([
                User.find({
                    $or: [
                        { usuario: regex },
                        { name: regex },
                        { role: regex },
                        { address: regex }
                    ]
                }),
                User.countDocuments()
            ]);
            break;

        case 'clients':

            // data = await Client.find({ name: regex });
            [data, total] = await Promise.all([
                Client.find({
                    $or: [
                        { name: regex },
                        { cedula: regex },
                        { phone: regex },
                        { email: regex },
                        { address: regex },
                        { city: regex },
                        { Department: regex }
                    ]
                }),
                Client.countDocuments()
            ]);
            break;
        case 'products':

            // data = await Client.find({ name: regex });
                        
            if (!status) {                        
                
                [data, total] = await Promise.all([
                    Product.find({
                        $or: [
                            { code: regex },
                            { name: regex },
                            { description: regex },
                            { type: regex }
                        ]
                    }),
                    Product.countDocuments()
                ]);
                
            }else{

                [data, total] = await Promise.all([
                    Product.find({
                        $or: [
                            { code: regex },
                            { name: regex },
                            { description: regex },
                            { type: regex }
                        ]
                    }),
                    Product.countDocuments()
                ]);

            }

            
            break;

        case 'departments':

            // data = await Department.find({ name: regex });
            [data, total] = await Promise.all([
                Department.find({ name: regex }),
                Department.countDocuments()
            ]);
            break;
        case 'categorias':

            // data = await Department.find({ name: regex });
            [data, total] = await Promise.all([
                Categoria.find({ name: regex })
                .populate('department', 'name did'),
                Categoria.countDocuments()
            ]);
            break;

        case 'caja':

            // data = await Department.find({ name: regex });
            [data, total] = await Promise.all([
                Caja.find({
                    $or: [
                        { description: regex },
                        { name: regex }
                    ]
                }),
                Caja.countDocuments()
            ]);
            break;
        case 'mesa':

            [data, total] = await Promise.all([
                Mesa.find({
                    $or: [
                        { name: regex }
                    ]
                }),
                Mesa.countDocuments()
            ]);
            break;

        case 'log':

            [data, total] = await Promise.all([
                LogProducts.find({
                    $or: [
                        { code: regex },
                        { name: regex },
                        { type: regex },
                        { departamento: regex }
                    ]
                })
                .populate('cajero', 'name')
                .populate('invoice')
                .sort({ 'fecha': -1 }),
                LogProducts.countDocuments()
            ]);
            break;

        default:
            res.status(400).json({
                ok: false,
                msg: 'Error en los parametros de la busquedad'
            });
            break;

    }

    res.json({
        ok: true,
        resultados: data,
        total
    });

};
/** =====================================================================
 *  SEARCH FOR TABLE
=========================================================================*/

/** =====================================================================
 *  SEARCH FRONTEND CLIENT
=========================================================================*/
const buscador = async(req, res = response) => {

    const termino = req.params.termino;
    const tipo = req.params.tipo;
    const regex = new RegExp(termino, 'i');

    const desde = Number(req.query.desde) || 0;
    const hasta = Number(req.query.hasta) || 10;

    let data = [];
    let total;

    switch (tipo) {
        case 'producto':

            data = await Product.find({
                    status: true,
                    out: false,
                    $or: [
                        { code: regex },
                        { name: regex },
                        { description: regex },
                        { type: regex }
                    ]
                })
                .populate('department', 'name')
                .skip(desde)
                .limit(hasta);
            break;

        case 'departamento':

            if (termino === 'none') {
                data = await Product.find({ status: true, out: false })
                    .populate('department', 'name')
                    .skip(desde)
                    .limit(hasta)
                    .sort({ sold: -1 });

            } else if (termino === 'nones') {
                data = await Product.find({ status: true, out: false })
                    .populate('department', 'name')
                    .skip(desde)
                    .limit(hasta)
                    .sort({ bought: -1 });

            } else {

                data = await Product.find({ department: termino, status: true, out: false })
                    .populate('department', 'name')
                    .skip(desde)
                    .limit(hasta);
            }

            break;

        default:
            res.status(400).json({
                ok: false,
                msg: 'Error en los parametros de la busquedad'
            });
            break;

    }

    res.json({
        ok: true,
        resultados: data,
        total
    });

};
/** =====================================================================
 *  SEARCH FRONTEND CLIENT
=========================================================================*/


// EXPORTS
module.exports = {
    search,
    buscador
};