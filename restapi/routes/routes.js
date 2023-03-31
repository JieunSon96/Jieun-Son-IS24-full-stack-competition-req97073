var express = require('express');
 
const router = express.Router();
 
var productController = require('../src/product/productController');

router.route('/').get(productController.getAllProductController);
 
router.route('/api/product/getAll').get(productController.getAllProductController);

router.route('/api/product/create').post(productController.createProductController);
/* #swagger.tags = ['Product']
   #swagger.description = 'Endpoint for creating the product.'
   #swagger.requestBody = {
            required: true,
            schema: { $ref: "#/definitions/Product" }
    } */

router.route('/api/product/update/:id').put(productController.updateProductController);
 
router.route('/api/product/delete/:id').delete(productController.deleteProductController);

router.route('/api/product/search/:keyword').get(productController.getPrdByKeywordController);
 
module.exports = router;