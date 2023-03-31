var productService = require('./productService');

/* Get all product data Controller*/
var getAllProductController = async(req,res) => {
   var product = await productService.getAllProductFromService();
   
   if (product) {
    res.send({"status":true,"data":product})
    res.status(200)
    } else {
    res.send({"status":false,"data":"Product is not found"})
    res.status(404)
    }
}

/* Create a product data Controller*/
var createProductController = async(req,res) => {
    var status = await productService.createProductService(req.body);
    if (status) {
        res.send({ "status": true, "message": "Product created successfully" });
        res.status(200)
    } else {
        res.send({ "status": false, "message": "Error creating product" });
        res.status(500)
    }
}


/* Update a product data Controller*/
var updateProductController = async (req, res) =>
{
    var result = await productService.updateProductService(req.params.id,req.body);
 
     if (result) {
        res.send({ "status": true, "message": "Product Updated"} );
        res.status(200)
     } else {
         res.send({ "status": false, "message": "Product Updatd Failed" });
         res.status(500)
     }
}
 
/* Delete a product data Controller*/
var deleteProductController = async (req, res) =>
{
     var result = await productService.removeProductService(req.params.id);
     if (result) {
        res.send({ "status": true, "message": "Product Deleted"} );
        res.status(200)
     } else {
        res.send({ "status": false, "message": "Product Delete Failed" });
        res.status(500)
     }
}

/* Search product data Controller*/
var getPrdByKeywordController = async(req,res) => {
    var product = await productService.getPrdByKeywordService(req.params.keyword);

    if(product){
        res.send({"status":true,"data":product})
        res.status(200)
    }else{
        res.send({"status":false,"data":"Product is not found"})
    }
    
 }

module.exports = { getAllProductController, createProductController,updateProductController,deleteProductController, getPrdByKeywordController };