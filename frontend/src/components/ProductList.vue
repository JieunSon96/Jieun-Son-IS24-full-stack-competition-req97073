<template>
    <div id="container">
<!-- Header -->
<nav class="navbar fixed-top navbar-dark bg-dark">
  <span class="navbar-brand mb-2 h1" style="margin-left:20px; margin-top:3px;"> IMB Product</span>
</nav>

 <!-- Add Action -->
<br><br>

<div class="row">
<div class="col-8"><br><br>    
<h2>List of Products 
    <button id="show-modal" class="btn btn-outline-primary" v-on:click="showModal = true"> Add New Product</button>
</h2>
<br><br>
</div>
 <!-- Search Form -->
   <div class="col-lg-4">
<br><br>   
  <form class="form-inline">
    <input class="form-control " style="width:80% !important;" type="search" v-model="searchKeyword" @keyup.enter="search" placeholder="Search" aria-label="Search">
    <button class="btn btn-outline-success" style="float:right; margin-right:30px; margin-top:-38px;" type="submit" @click="searchKeywordMethod">Search</button>
  </form>

   </div>

</div>

 <!-- Product Table  -->
 <div class="col-12"> 
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
    
 </div>
    <h5>Displaying {{resultCount}} products</h5>


<!-- Modal Setup-->
 <script type="text/x-template" id="modal-template">
  <transition name="modal">
    <div class="modal-mask" >
      <div class="modal-wrapper">
        <div class="modal-container">
        <slot name="header"></slot>   <button id="modal-x-button" class="btn btn-warning" v-on:click="$emit('close')" style="float:right !important;">X</button>
        </div>
      </div>
    </div>
  </transition>
</script>


<!-- Modal Form  -->
<div id="app">
<modal v-if="showModal" v-on:close="showModal = false" :modalProductData="product">
<span slot="header"> 
  <div class="card card-body">
     <h2 v-if="!product.startDate">Product Registation</h2>
     <h2 v-if="product.startDate">Product Edit</h2>
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
                <input-tag type="text" v-model="tags"  class="form-control" :limit="5" validate="text" placeholder="Please input up to five developers"></input-tag>
            </div>

            <div class="form-group">
                <label>ScrumMasterName</label>
                <input type="text" v-model="product.scrumMasterName" class="form-control" placeholder="scrumMasterName">
            </div>
    
            <div class="form-group">
                <label v-if="!product.productId">StartDate</label>
                <input type="text" v-if="!product.productId" v-model="product.startDate" class="form-control" placeholder="ex) 2023/05/23"> 
    
            </div>

            <div class="form-group">  
                <label>Methodology</label>
                <select  v-model="product.methodology" id="inputState" class="form-control">
                <option selected>Agile</option>
                <option>Waterfall</option>
                </select> 

            </div>

            <button  type="submit" id="saveBt" class="btn btn-primary">Save</button>
        </form>
  </div>
    </span>
  </modal>
</div>


    </div>
</template>

<script>
import Vue from 'vue';
import axios from 'axios';
import InputTag from 'vue-input-tag'


Vue.component('input-tag', InputTag)
Vue.component('modal', {
  template: '#modal-template'
})

new Vue({
  el: '#app',
  data: {
    showModal: false
  }
})


export default {
    name: 'ProductList',
    data() {
        return {
            search:"",
            result: {},
            product: {
            productId: '',
            productName: '',
            productOwnerName: '',
            developers: [''],
            scrumMasterName: '',
            startDate: '',
            methodology: '',

            },
            showModal:false
        }
    },
    created() {
        this.ProductLoad();
    },
    mounted() {
        console.log("Vue.js");
    },
    methods: {
        /* Get all Product Method */
        ProductLoad() {
            var page = "http://localhost:3000/api/product/getAll/";
            axios.get(page)
                .then(
                    ({ data }) => {
                        this.result = data.data;
                        this.resultCount = data.data.length;
                    }
                );
        }, 
        save() {
            if (this.product.productId == '') {
                this.saveData();
            } else {
                this.updateData();
            }

        },/* Save Product Method */
        saveData() {

        /* Form Save Validation */
        this.product.developers=this.tags;   

        const productNameIsValid = !!this.product.productName
        const productOwnerNameIsValid = !!this.product.productOwnerName
        
        var developersIsValid=false;

        if(!this.product.developers){
                 developersIsValid=false;
        }else{
                developersIsValid=true;
        }

        const scrumMasterNameIsValid = !!this.product.scrumMasterName
        const startDateIsValid = !!this.product.startDate
        const methodologyIsValid = !!this.product.methodology

        const formIsValid = productNameIsValid && productOwnerNameIsValid  &&developersIsValid && scrumMasterNameIsValid && startDateIsValid && methodologyIsValid
         
        if(formIsValid){
            axios.post("http://localhost:3000/api/product/create/", this.product)
                .then(
                    ({ data }) => {
                        this.ProductLoad();
                        this.showModal=false;
                        this.resetForm();
                    }
                )
            alert("Save!!")
        }else{
             alert("Please fill in the blank!")
        }

        },edit(product) {
        
             this.showModal = !this.showModal;
             this.tags=product.developers;
             this.product = product;

        },
        /* Update Product Method */
        updateData() {
            var editproducts = 'http://localhost:3000/api/product/update/' + this.product.productId;
            this.product.developers=this.tags;
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
                        this.showModal=false;
                        this.ProductLoad();
                    }
                );

        },
         /* Remove Method */
        remove(product) {
            alert(product.productId)
            var url = `http://localhost:3000/api/product/delete/${product.productId}`;
            axios.delete(url);
            alert("Deleted");
            this.ProductLoad();
        },
        /* Search ScrumMasterName and Developers Method */
        searchKeywordMethod(){
            var page = "http://localhost:3000/api/product/search/"+ this.searchKeyword;
            axios.get(page)
                .then(
                    ({ data }) => {
                        this.result = data.data;
                        this.resultCount = data.data.length;
                    }
                );
        }
    }
}
</script>


<style scoped>
#container{
    margin:0px;
    margin-left:10px;
    padding:10px;
    margin-right:10px;
}

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .4s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
  width:600px;
}

.modal-container {
    position:relative;
    top:20%;
    left:20%;
  width: 50%;
  margin: 0px auto;
  padding: 20px 30px;
  min-height: 35px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .2s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(0.95);
  transform: scale(0.95);
}

#saveBt{
    float:right;
    margin-top:10px;
}
</style>