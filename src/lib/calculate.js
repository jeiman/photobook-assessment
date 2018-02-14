// Commision Calculator

const config = require('../config')

const businessCard = config.businessCard
const brochures = config.brochures
const yearBook = config.yearBook
const mug = config.mug
const defaultCommision = config.defaultCommision


function Product (product, quantity) {
  this.product = product
  this.quantity = quantity
  this.calculateUOMSold = (quantity) => {
    switch (product) {
      case 'businessCard':
        console.log('calculating businesscard....')
        return businessCard.uom * quantity
        break
      case 'brochures':
        console.log('calculating brochures....')
        return brochures.uom * quantity
        break
      case 'yearBook':
        console.log('calculating yearbook....')
        return yearBook.uom * quantity
        break
      case 'mug':
        console.log('calculating mug....')
        return mug.uom * quantity
        break
      default:
        console.log('calculating default....')
        return 10 * quantity
    }
  }

  this.calculateSales = (product, quantity) => {
    switch (product) {
      case 'businessCard':
        console.log('calculating businesscard....')
        return businessCard.salePrice * quantity
        break
      case 'brochures':
        console.log('calculating brochures....')
        return brochures.salePrice * quantity
        break
      case 'yearBook':
        console.log('calculating yearbook....')
        return yearBook.salePrice * quantity
        break
      case 'mug':
        console.log('calculating mug....')
        return mug.salePrice * quantity
        break
      default:
        console.log('calculating default....')
        return 10 * quantity
    }
  }

  this.calculateCommision = (product, quantity, sales) => {
    switch (true) {
      case ((product === 'businessCard') && (quantity < 10)):
        console.log('calculating commision for less than 10....')
        return businessCard.defaultCommision * sales
        break
      case ((product === 'businessCard') && (quantity >= 10)):
        console.log('calculating commision more than 10....')
        return businessCard.commisions.more10 * sales
        break
      case ((product === 'businessCard') && (quantity >= 20)):
        console.log('calculating commision more than 20....')
        return businessCard.commisions.more20 * sales
        break
      case ((product === 'businessCard') && (quantity >= 50)):
        console.log('calculating commision more than 50....')
        return businessCard.commisions.more50 * sales
        break     
      default:
        console.log('calculating commision default....')
        return config.defaultCommision * sales
      }
  }
}

module.exports.Product = Product

// module.exports = {

    // calculateCommision: function(product, quantity, sales) {
    //     switch (true) {
    //         case ((product === businessCard) && (quantity < 10)):
    //             console.log('calculating commision businesscard for less than 10....')
    //             return businessCard.less10 * sales
    //             break
    //         case ((product === businessCard) && (quantity >= 10)):
    //             console.log('calculating commision brochures....')
    //             return businessCard.more10 * sales
    //             break
    //         case ((product === businessCard) && (quantity >= 20)):
    //             console.log('calculating commision yearbook....')
    //             return businessCard.more20 * sales
    //             break
    //         case ((product === businessCard) && (quantity >= 50)):
    //             console.log('calculating commision mug....')
    //             return businessCard.more50 * sales
    //             break
    //         default:
    //             console.log('calculating commision default....')
    //             return defaultCommision.businessCardComm * sales
    //             log
    //     }
    // },
    
//     calculateSales: function(product, quantity) {
//         switch (product) {
//             case 'businessCard':
//                 console.log('calculating businesscard....')
//                 return businessCard.salePrice * quantity
//                 break
//             case 'brochures':
//                 console.log('calculating brochures....')
//                 return brochures.salePrice * quantity
//                 break
//             case 'yearBook':
//                 console.log('calculating yearbook....')
//                 return yearBook.salePrice * quantity
//                 break
//             case 'mug':
//                 console.log('calculating mug....')
//                 return mug.salePrice * quantity
//                 break
//             default:
//                 console.log('calculating default....')
//                 return 10 * quantity
//         }
//     }

// }

