// Commision Calculator

const config = require('../config')

const businessCard = config.businessCard
const brochures = config.brochures
const yearBook = config.yearBook
const mug = config.mug
const defaultCommisionForAll = config.defaultCommisionForAll

function Product (product, quantity) {
  this.product = product
  this.quantity = quantity
  this.assignId = () => {
    switch (product) {
      case 'businessCard':
        return 1
        break
      case 'brochures':
        return 2
        break
      case 'yearBook':
        return 3
        break
      case 'mug':
        return 4
        break
      default:
        return 0
    }
  }
  
  this.calculateUOMSold = (quantity) => {
    switch (product) {
      case 'businessCard':
        return businessCard.uom * quantity
        break
      case 'brochures':
        return brochures.uom * quantity
        break
      case 'yearBook':
        return yearBook.uom * quantity
        break
      case 'mug':
        return mug.uom * quantity
        break
      default:
        return 10 * quantity
    }
  }

  this.calculateSales = (product, quantity) => {
    switch (product) {
      case 'businessCard':
        return businessCard.salePrice * quantity
        break
      case 'brochures':
        return brochures.salePrice * quantity
        break
      case 'yearBook':
        return yearBook.salePrice * quantity
        break
      case 'mug':
        return mug.salePrice * quantity
        break
      default:
        return 10 * quantity
    }
  }

  this.calculateCommision = (product, quantity, sales) => {
    switch (true) {
      case ((product === 'businessCard') && (quantity < 10)):
        return businessCard.defaultCommision * sales
        break
      case ((product === 'businessCard') && (quantity >= 10)):
        return businessCard.commisions.more10 * sales
        break
      case ((product === 'businessCard') && (quantity >= 20)):
        return businessCard.commisions.more20 * sales
        break
      case ((product === 'businessCard') && (quantity >= 50)):
        return businessCard.commisions.more50 * sales
        break

      case ((product === 'brochures') && (quantity < 10)):
        return brochures.defaultCommision * sales
        break
      case ((product === 'brochures') && (quantity >= 10)):
        return brochures.commisions.more10 * sales
        break
      case ((product === 'brochures') && (quantity >= 20)):
        return brochures.commisions.more20 * sales
        break
      case ((product === 'brochures') && (quantity >= 50)):
        return brochures.commisions.more50 * sales
        break

      case ((product === 'yearBook') && (quantity < 5)):
        return yearBook.defaultCommision * sales
        break
      case ((product === 'yearBook') && (quantity >= 10)):
        return yearBook.commisions.more10 * sales
        break
      case ((product === 'yearBook') && (quantity >= 20)):
        return yearBook.commisions.more20 * sales
        break
      case ((product === 'yearBook') && (quantity >= 50)):
        return yearBook.commisions.more50 * sales
        break

      case ((product === 'mug')):
        return mug.defaultCommision * sales
        break

      default:
        return defaultCommisionForAll * sales
      }
  }
}

module.exports.Product = Product
