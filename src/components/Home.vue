<template>
    <div class="home" id="all-products">
        <h1>Products Commision Calculation</h1>
        <router-link :to="{ name: 'create_product' }" class="btn btn-primary">Insert new</router-link>
        <vue-good-table
          :columns="columns"
          :rows="rows"
          :paginate="true"
          :defaultSortBy="{field: 'id', type: 'asc'}"
          :globalSearch="true"
          styleClass="table table-stripped table-bordered condensed">
          <div slot="emptystate">
            No results
          </div>

          <template slot="table-row" scope="props">
            <td><a><router-link :to="{name: 'view_product', params: {id: props.row.id}}">{{ props.row.id }}</router-link></a></td>
            <td class="fancy">{{ props.row.name }}</td>
            <td>{{ props.row.price }}</td>
            <td>
              <router-link :to="{name: 'edit_product', params: { id: props.row.id }}" class="btn btn-info"><i class="fa fa-pencil" aria-hidden="true"></i>
        Edit</router-link>
              <router-link :to="{name: 'delete_product', params: { id: props.row.id }}" class="btn btn-danger"><i class="fa fa-trash" aria-hidden="true"></i>
        Delete</router-link>
            </td>
          </template>
        </vue-good-table>
    </div>
</template>

<script>

import Candidates from '../../data/product-data'

let candid = Candidates

import { getCandidateData } from '../lib/action'

  export default {
    data() {
      return {
        columns: [
          {
            label: 'ID',
            field: 'id',
            sortable: true,
          },
          {
            label: 'Name',
            field: 'name',
            html: false,
            filterable: true,
          },
          {
            label: 'Pricing',
            field: 'price',
            type: 'decimal',
            html: false,
            filterable: true,
          },
          {
            label: 'Action',
            field: 'action',
            filterable: false,
          },
        ],
        rows: candid
    }
      },
        // data(){
        //     return{
        //         products: [],
        //         originalProducts: [],
        //         productSearch: ''
        //     }
        // },

        created: function()
        {
            this.fetchProductData();
        },

        methods: {
            fetchProductData: function()
            {
                this.$http.get('http://localhost:3000/api/products').then((response) => {
                    this.products = response.body;
                    this.originalProducts = this.products;
                }, (response) => {
                     console.log('response >> ', response)
                });
            },

            searchProducts: function()
            {
                if(this.productSearch == '')
                {
                    this.products = this.originalProducts;
                    return;
                }

                var searchedProducts = [];
                for(var i = 0; i < this.originalProducts.length; i++)
                {
                    var productName = this.originalProducts[i]['name'].toLowerCase();
                    var price = this.originalProducts[i]['price'];
                    if (productName.indexOf(this.productSearch.toLowerCase()) >= 0 || price.indexOf(this.productSearch.toLowerCase()) >= 0)
                    {
                        searchedProducts.push(this.originalProducts[i]);
                    }
                }

                this.products = searchedProducts;
            }
        }
    }
 </script>
