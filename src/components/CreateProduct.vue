<template>
    <div class="home" id="create-product">
        <h1>Create Product</h1>
        <p><router-link :to="{ name: 'home' }" class="btn btn-primary"><i class="fa fa-arrow-left"></i> Return to products</router-link></p>
        <notification v-bind:notifications="notifications"></notification>
        <form v-on:submit.prevent="addProduct">
            <div class="form-group">
                <label name="product_id">Product</label>
                <select v-model="selected">
                    <option disabled value="">Please select one</option>
                    <option value="businessCard">Business Card (200/box)</option>
                    <option value="brochures">Brochures (1000/box)</option>
                    <option value="yearBook">Year Book (50/box)</option>
                    <option value="mug">Mug (Cup)</option>
                </select>
            </div>
            <div class="form-group">
                <label name="product_name">Quantity</label>
                <input type="number" class="form-control" v-model="product.quantity" id="product_quantity" min="1" required>
            </div>
            <div class="form-group">
                <button class="btn btn-primary">Submit</button>
            </div>
        </form>
    </div>
</template>

<script>
import Notification from './Notifications.vue'
import request from 'superagent'

const BASE_URL = 'http://localhost:3000'

export default {
  data() {
    return {
      product: {},
      selected: '',
      notifications: []
      }
    },

    methods: {
      addProduct() {
        // Validation
        const quantity = parseInt(this.product.quantity)
        if (isNaN(quantity)) {
          this.notifications.push({
            type: 'danger',
            message: 'Quantity must be a number'
          })
          return false
        } else {
          this.product.quantity = this.product.quantity
        }

        // Payload to be sent
        const payload = {
          product: this.selected,
          quantity: Math.floor(this.product.quantity)
        }

        let req = request.post(`${BASE_URL}/api/product/create`)
        req.set('Content-Type', 'application/json')
        req.send({ payload })

        req.end((err, res) => {
          if (err) {
            console.log('err', err)
          }

          // User validation for entering duplicate records
          if (res.statusCode === 304) {
            this.notifications.push({
              type: 'danger',
              message: 'You can\t create a duplicate record.'
            })
            return false
          }
          
          if (res.statusText === 'OK' && res.statusCode === 200) {
            this.notifications.push({
              type: 'success',
              message: 'Product created successfully. Redirecting you shortly..'
            })
            setTimeout(() => {
              this.$router.push({name: 'home'})
            }, 1200)
          }
        })
      }
    },

    components: {
      'notification' : Notification
    }
}
</script>
