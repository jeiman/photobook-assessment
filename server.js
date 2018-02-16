const fs = require('fs')
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')

const Product = require('./src/lib/calculate')
const PRODUCTS_FILE = path.join(__dirname, 'data/product-data.json')

const app = express()

app.set('port', (process.env.PORT || 3000))
app.use('/', express.static(__dirname))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

// Additional middleware which will set headers that we need on each request.
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE')
  // Disable caching so we'll always get the latest comments.
  res.setHeader('Cache-Control', 'no-cache')
  next()
})

app.get('/api/products', (req, res) => {
  fs.readFile(PRODUCTS_FILE, (err, data) => {
    if (err) {
      console.error(err)
      return res.sendStatus(500)
    }
    let candidateData = JSON.parse(data)
    return res.json(candidateData)
  })
})

app.get('/api/clear', (req, res) => {
  fs.readFile(PRODUCTS_FILE, (err, data) => {
    if (err) {
      console.error(err)
      return res.sendStatus(500)
    }
    let candidateData = JSON.parse(data)
    candidateData.splice(0, candidateData.length)
    // console.log(candidateData)
    fs.writeFile(PRODUCTS_FILE, JSON.stringify(candidateData, null, 4), (err) => {
      if (err) {
        console.error(err)
        return res.sendStatus(500)
      }
      return res.status(200).send('OK')
    })
  })
})

app.post('/api/product/create', (req, res) => {
  const product = req.body.payload.product
  const quantity = req.body.payload.quantity

  // Create a new product
  const products = new Product.Product(product, quantity)
  const saleMade = products.calculateSales(product, quantity)
  const uom = products.calculateUOMSold(quantity)
  const commisionMade = products.calculateCommision(product, quantity, saleMade)
  const id = products.assignId()

  const summary = {
    id,
    name: product,
    quantity,
    uom,
    saleMade,
    commisionMade
  }

  fs.readFile(PRODUCTS_FILE, (err, data) => {
    if (err) {
      console.error(err)
      return res.sendStatus(500)
    }
    const payloadData = JSON.parse(data)

    for (let value of payloadData) {
      if (value['id'] === summary.id) {
        // Duplication occurred. Return 304 asking user to modify their request
        return res.status(304).send('Not Modified')
      }
    }

    payloadData.push(summary)
    fs.writeFile(PRODUCTS_FILE, JSON.stringify(payloadData, null, 4), (err) => {
      if (err) {
        console.error(err)
        return res.sendStatus(500)
      }
      return res.json(payloadData)
    })
  })
})

app.listen(app.get('port'), () => {
  console.log(`Server started: http://localhost:${app.get('port')}`)
})