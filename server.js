var fs = require('fs')
var path = require('path')
var express = require('express')
var bodyParser = require('body-parser')
var app = express()

var Product = require('./src/lib/calculate')

var PRODUCTS_FILE = path.join(__dirname, 'data/product-data.json')

app.set('port', (process.env.PORT || 3000))

app.use('/', express.static(__dirname))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

// Additional middleware which will set headers that we need on each request.
app.use(function(req, res, next) {
    // Set permissive CORS header - this allows this server to be used only as
    // an API server in conjunction with something like webpack-dev-server.
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE')

    // Disable caching so we'll always get the latest comments.
    res.setHeader('Cache-Control', 'no-cache')
    next()
});

app.get('/api/products', (req, res) => {
    fs.readFile(PRODUCTS_FILE, (err, data) => {
        if (err) {
            console.error(err)
            process.exit(1)
        }
        let candidateData = JSON.parse(data)
        console.log(candidateData)
        res.json(candidateData)
    })
})


app.get('/api/product/:id', (req, res) => {

    fs.readFile(PRODUCTS_FILE, (err, data) => {
        if (err) {
            console.error(err);
            process.exit(1);
        }

        const json = JSON.parse(data)

        for (let value of json) {
            if (value['id'] == req.params.id) {
                console.log(value)
                res.json(value)
                break
            }
        }

        // for(var i = 0; i < json.length; i++)
        // {
        //     if(json[i]['id'] == req.params.id)
        //     {
        //         // console.log(res.json[i])
        //         res.json(json[i]);
        //         break;
        //     }
        // }
    })
})

app.post('/api/product/create', (req, res) => {
    const product = req.body.payload.product
    const quantity = req.body.payload.quantity
    
    // const saleMade = calculator.calculateSales(product, quantity)
    // console.log(`saleMade is $${saleMade}`)

    // const commisionMade = calculator.calculateCommision(product, quantity, saleMade)
    // console.log(`Commision made for ${product} is ${commisionMade}`)

    const products = new Product.Product(product, quantity)
    const saleMade = products.calculateSales(product, quantity)
    const uom = products.calculateUOMSold(quantity)
    const commisionMade = products.calculateCommision(product, quantity, saleMade)

    // console.log(saleMade)
    // console.log(commish)

    const summary = {
        product,
        quantity,
        uom,
        saleMade,
        commisionMade
    }

    return res.json(summary)

    // fs.readFile(PRODUCTS_FILE, function(err, data) {
    //     if (err) {
    //         console.error(err)
    //         process.exit(1)
    //     }
    //     var products = JSON.parse(data)

    //     var newProduct = {
    //         id: Date.now(),
    //         name: req.body.name,
    //         price: req.body.price,
    //     };
    //     products.push(newProduct);
    //     fs.writeFile(PRODUCTS_FILE, JSON.stringify(products, null, 4), function(err) {
    //         if (err) {
    //             console.error(err)
    //             process.exit(1)
    //         }
    //         res.json(products)
    //     })
    // })
})

app.listen(app.get('port'), function() {
    console.log('Server started: http://localhost:' + app.get('port') + '/');
})