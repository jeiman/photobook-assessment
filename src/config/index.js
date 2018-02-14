'use strict'

module.exports = {
    businessCard: {
        salePrice: 10,
        uom: 200,
        defaultCommision: 0.10,
        commisions: {
            more10: 0.12,
            more20: 0.15,
            more50: 0.20
        }
    },

    brochures: {
        salePrice: 20,
        uom: 1000,
        defaultCommision: 0.08,
        commisions: {
            more10: 0.10,
            more20: 0.14,
            more50: 0.18
        }
    },

    yearBook: {
        salePrice: 100,
        uom: 50,
        defaultCommision: 0.07,
        commisions: {
            more10: 0.09,
            more20: 0.13,
            more50: 0.15
        }
    },

    mug: {
        salePrice: 10,
        uom: 200,
        defaultCommision: 0.10,
        commisions: {
            more10: 0.10
        }
    },
    
    defaultCommision: 0.10
}