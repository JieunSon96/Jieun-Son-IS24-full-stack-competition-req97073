var productService = require('./productService');

/* Get all product data Controller*/
var getAllProductController = async(req,res) => {
   var product = await productService.getAllProductFromService();
   res.send({"status":true,"data":product})
}

/* Create a product data Controller*/
var createProductController = async(req,res) => {
    var status = await productService.createProductService(req.body);
    if (status) {
        res.send({ "status": true, "message": "Product created successfully" });
    } else {
        res.send({ "status": false, "message": "Error creating user" });
    }
}

/* Update a product data Controller*/
var updateProductController = async (req, res) =>
{
    var result = await productService.updateProductService(req.params.id,req.body);
 
     if (result) {
        res.send({ "status": true, "message": "Product Updateeeedddddd"} );
     } else {
         res.send({ "status": false, "message": "Product Updateeeedddddd Faileddddddd" });
     }
}
 
/* Delete a product data Controller*/
var deleteProductController = async (req, res) =>
{
     var result = await productService.removeProductService(req.params.id);
     if (result) {
        res.send({ "status": true, "message": "Product Deleteddd"} );
     } else {
         res.send({ "status": false, "message": "Product Deleteddd Faileddddddd" });
     }
}

/* Search product data Controller*/
var getPrdByKeywordController = async(req,res) => {
    var product = await productService.getPrdByKeywordService(req.params.keyword);
    res.send({"status":true,"data":product})
 }

module.exports = { getAllProductController, createProductController,updateProductController,deleteProductController, getPrdByKeywordController };