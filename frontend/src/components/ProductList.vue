/* eslint-disable */


<script>
//import Vue from 'vue';
import axios from 'axios';

//Vue.use(axios)


export default {
    name: 'ProductList',
    data() {
        return {
            result: {},
            product: {
                productId: '',
                productName: '',
                productOwnerName: '',
                developers: [''],
                scrumMasterName: '',
                startDate: '',
                methodology: '',

            }
        }
    },
  
    created() {
        this.ProductLoad();
    },
    mounted() {
        console.log("mounted() called.......");

    },

    methods: {
        ProductLoad() {
            var page = "http://localhost:3000/api/product/getAll/";
            axios.get(page)
                .then(
                    ({ data }) => {
                        this.result = data.data;
                        this.resultCount = data.data.length;
                    }
                );
        }, save() {
            if (this.product.productId == '') {
                this.saveData();
            } else {
                this.updateData();
            }

        }, saveData() {
        console.log("저장하자!!!!"+this.product.productName);
            axios.post("http://localhost:3000/api/product/create/", this.product)
                .then(
                    ({ data }) => {
                        alert("saveddddd"+data);
                        this.ProductLoad();
                    }
                )

        },edit(product) {
            this.product = product;

        },updateData() {
            var editproducts = 'http://localhost:3000/api/product/update/' + this.product.productId;
            axios.put(editproducts, this.product)
                .then(
                    ({ data }) => {
                        this.product.productName = '';
                        this.product.productOwnerName = '',
                            this.product.developers = ''
                        this.product.scrumMasterName = '';
                        this.product.startDate = '',
                            this.product.methodology = ''
                        this.productId = ''
                        alert("Updated!!!");
                        this.ProductLoad();
                    }
                );

        },remove(product) {
            var url = `http://localhost:3000/api/product/delete/${product.productId}`;
            axios.delete(url);
            alert("Deleted");
            this.ProductLoad();
        }
    }
}
</script>

<template>


    <div>
   <!-- As a heading -->
<nav class="navbar navbar-dark bg-dark">
  <span class="navbar-brand mb-0 h1">IMB Product</span>
</nav>
       

        <h2>List of Products <button type="button" class="btn btn-info" @click="edit(product)" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">Add New Product</button><nav class="navbar navbar-light bg-light">
  <form class="form-inline">
    <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
    <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
  </form>
</nav></h2>
        <table class="table table-dark">
    
            <thead>
    
                <tr>
    
                    <th scope="col">ID</th>
    
                    <th scope="col">Productname</th>
    
                    <th scope="col">ProductOwnerName</th>

                    <th scope="col">Developers</th>
    
                    <th scope="col">ScrumMasterName</th>
    
                    <th scope="col">StartDate</th>
    
                    <th scope="col">Methodology</th>

                    <th scope="col"></th>
    
                </tr>
    
            </thead>
    
            <tbody>
    
                <tr v-for="product in result" v-bind:key="product.productId">
    
    
    
                    <td>{{ product.productId }}</td>
    
                    <td>{{ product.productName }}</td>

                    <td>{{ product.productOwnerName }}</td>
    
                    <td><p v-for="devName in product.developers" :key="devName.id">{{ devName }}</p></td>

                    <td>{{ product.scrumMasterName }}</td>

                    <td>{{ product.startDate }}</td>

                    <td>{{ product.methodology }}</td>
    
                    <td>
    
                        <button type="button" class="btn btn-warning" @click="edit(product)">Edit</button>
    
                        <button type="button" class="btn btn-danger" @click="remove(product)">Delete</button>
    
                    </td>
    
                </tr>
    
    
        
            </tbody>

        </table>
    
    
    <h5>Displaying {{resultCount}} products</h5>


 <h2>Product Registation</h2>
     
  <div class="card card-body">
        <form @submit.prevent="save">
    
            <div class="form-group">
    
                <label>ProductName</label>
    
                <input type="text" v-model="product.productName" class="form-control" placeholder="Product name">
    
    
    
            </div>
    
            <div class="form-group">
    
                <label>ProductOwnerName</label>
    
                <input type="text" v-model="product.productOwnerName" class="form-control" placeholder="productOwnerName">
    
    
    
            </div>
    
    
    
            <div class="form-group">
    
                <label>Developers</label>
    
                <input type="text" v-model="product.developers" class="form-control" placeholder="developers">
    
    
    
            </div>

            <div class="form-group">
    
                <label>ScrumMasterName</label>
    
                <input type="text" v-model="product.scrumMasterName" class="form-control" placeholder="scrumMasterName">
    
    
    
            </div>
    
    
    
            <div class="form-group">
    
                <label>StartDate</label>
    
                <input type="text" v-model="product.startDate" class="form-control" placeholder="startDate">
    
    
    
            </div>
    
    
    
            <div class="form-group">
    
                <label>Methodology</label>
    
                <input type="text" v-model="product.methodology" class="form-control" placeholder="methodology">
    
    
    
            </div>
    
    
    
            <button type="submit" class="btn btn-primary">Save</button>
    
        </form>
  </div>
    </div>
</template>
  
