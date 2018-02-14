<template>
    <div class="home" id="create-product">
        <h1>Create Product</h1>
        <p><router-link :to="{ name: 'home' }">Return to products</router-link></p>
        <notification v-bind:notifications="notifications"></notification>
        <form v-on:submit.prevent="addProduct">
            <div class="form-group">
                <label name="product_id">ID</label>
                <input type="text" class="form-control" disabled v-model="product.id" id="product_id">
            </div>
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
                <input type="number" class="form-control" v-model="product.quantity" id="product_quantity" required>
            </div>
            <div class="form-group">
                <button class="btn btn-primary">Submit</button>
            </div>
        </form>
    </div>
</template>

<script>
import Notification from './Notifications.vue'

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

            const payload = {
                product: this.selected,
                quantity: Math.floor(this.product.quantity)
            }

            this.$http.post('http://localhost:3000/api/product/create', { payload }, {
                headers : {
                    'Content-Type' : 'application/json'
                }
            }).then((response) => {
                this.notifications.push({
                    type: 'success',
                    message: 'Product created successfully'
                })
            }, (response) => {
                this.notifications.push({
                    type: 'error',
                    message: 'Product not created'
                })
            })
        }
    },

    components: {
        'notification' : Notification
    }
}
</script>
