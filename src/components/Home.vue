<template>
<div class="home" id="all-products">
  <h1>Products Commision Calculation</h1>
  <p class="inline"><router-link :to="{ name: 'create_product' }" class="btn btn-primary">Insert new</router-link></p>
  <p class="inline"><a @click="clearProducts" class="btn btn-danger">Clear Products</a></p>
  <notification v-bind:notifications="notifications"></notification>
  <div class="form-group">
    <input type="text" name="search" v-model="productSearch" placeholder="Search products" class="form-control" v-on:keyup="searchProducts">
  </div>
  <table class="table table-bordered table-hover">
    <thead>
      <tr>
        <th>Items</th>
        <th>Quantity</th>
        <th>Sales amount (USD)</th>
        <th>Commision gained (USD)</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="product in products">
        <td>{{ product.name }}</td>
        <td>{{ product.quantity }} boxes <br>{{ `(${product.uom})` }}</td>
        <td>{{ product.saleMade }}</td>
        <td>{{ product.commisionMade }}</td>
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <td>Total</td>
        <td>&nbsp;</td>
        <td>{{ totalSalesMade }}</td>
        <td>{{ totalCommMade }}</td>
      </tr>
    </tfoot>
  </table>
</div>
</template>

<script>
import Notification from './Notifications.vue'
import request from 'superagent'
const BASE_URL = 'http://localhost:3000'

export default {
  data() {
    return {
      products: [],
      totalSalesMade: '',
      totalCommMade: '',
      originalProducts: [],
      productSearch: ''
    }
  },

  created() {
    this.fetchProductData()
  },
  
  methods: {
    clearProducts() {
      request.get(`${BASE_URL}/api/clear`)
        .then((res) => {
          console.warn('response >>>', res)
          if (res.statusText === 'OK' && res.statusCode === 200) {
            this.notifications.push({
              type: 'success',
              message: 'Cleared products.'
            })
            setTimeout(() => {
              this.$router.push({name: 'home'})
            }, 1200)
          }
        })
        .catch((err) => {
          console.log('err fetching products', err)
        })
    },

    fetchProductData() {
      request.get(`${BASE_URL}/api/products`)
        .then((res) => {
          if (res.statusText === 'OK' && res.statusCode === 200) {
            this.products = res.body
            this.totalSalesMade = this.products.reduce((prev, elem) => prev + elem.saleMade, 0)
            this.totalCommMade = this.products.reduce((prev, elem) => prev + elem.commisionMade, 0)
            this.originalProducts = this.products
          }
        })
        .catch((err) => {
          console.log('err fetching products', err)
        })
    },
    
    searchProducts() {
      if (this.productSearch == '') {
        this.products = this.originalProducts
        return
      }
      
      let searchedProducts = []
      for (let i = 0; i < this.originalProducts.length; i++) {
        let productName = this.originalProducts[i]['name'].toLowerCase()
        if (productName.indexOf(this.productSearch.toLowerCase()) >= 0) {
          searchedProducts.push(this.originalProducts[i])
        }
      }
      this.products = searchedProducts
    }
  },
  components: {
    'notification' : Notification
  }
}
 </script>

 <style lang="scss" scoped>
 tfoot {
     tr {
         font: {
            weight: 700;
        }
     }
 }
 </style>
