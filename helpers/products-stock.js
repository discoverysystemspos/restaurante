// MODELS
const Product = require('../models/products.model');

/** =====================================================================
 *  UPDATE STOCK 
=========================================================================*/
const soldProduct = async(products) => {

    if (!products) {
        return false;
    }
    
    for (let i = 0; i < products.length; i++) {
        
        let id = products[i].product;

        const product = await Product.findById(id);

        // SI ES DIFERENTE A UN KIT
        if (product.type !== 'Paquete') {

            // SI NO SE HA VENDIDO
            if (!product.sold) {
                product.sold = 0;
            }

            // ACTUALIZAMOS
            product.sold += products[i].qty;
            const productUpdate = await Product.findByIdAndUpdate(id, product, { new: true, useFindAndModify: false });
                        
        }else {

            const kits = product.kit

            for (let i = 0; i < kits.length; i++) {
                
                let id = kits[i].product;

                const productKit = await Product.findById(id);

                // SI NO SE HA VENDIDO
                if (!productKit.sold) {
                    productKit.sold = 0;
                }

                // ACTUALIZAMOS
                productKit.sold += kits[i].qty;
                const productUpdate = await Product.findByIdAndUpdate(id, productKit, { new: true, useFindAndModify: false });
                
            }

        }
        
    }


};
/** =====================================================================
 *  UPDATE STOCK
=========================================================================*/
/** =====================================================================
 *  RETURN STOCK
=========================================================================*/
const returnStock = async(products) => {

    if (!products) {
        return false;
    }
    
    for (let i = 0; i < products.length; i++) {
        
        let id = products[i].product;

        const product = await Product.findById(id);

        // SI ES DIFERENTE A UN KIT
        if (product.type !== 'Paquete') {

            // SI NO SE HA VENDIDO
            if (!product.returned) {
                product.returned = 0;
            }

            // ACTUALIZAMOS
            product.returned += products[i].qty;
            const productUpdate = await Product.findByIdAndUpdate(id, product, { new: true, useFindAndModify: false });
                        
        }else {

            const kits = product.kit

            for (let i = 0; i < kits.length; i++) {
                
                let id = kits[i].product;

                const productKit = await Product.findById(id);

                // SI NO SE HA VENDIDO
                if (!productKit.returned) {
                    productKit.returned = 0;
                }

                // ACTUALIZAMOS
                productKit.returned += kits[i].qty;
                const productUpdate = await Product.findByIdAndUpdate(id, productKit, { new: true, useFindAndModify: false });
                
            }

        }
        
    }


}
/** =====================================================================
 *  RETURN STOCK
=========================================================================*/

// EXPORT
module.exports = {
    soldProduct,
    returnStock
};