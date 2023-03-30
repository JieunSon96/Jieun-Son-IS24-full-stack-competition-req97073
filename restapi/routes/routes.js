var express = require('express');
 
const router = express.Router();
 
var productController = require('../src/product/productController');

/**
 * @swagger 
 *  components:
 *     schemas:
 *         Product:
 *                type: object
 *                properties: 
 *                   productName:
 *                        type: string
 *                   productOwnerName:
 *                        type: string
 *                   developers:
 *                         type: array
 *                   scrumMasterName:
 *                         type:string
 *                   startDate:
 *                         type:string
 *                   methodology:
 *                          type:string
 */

/**
 * @swagger
 * /:
 *  get:
 *      summary: This api is used to check all of the product list if get method is working or not
 *      description: This api is used to check all of the product list if get method is working or not
 *      responses: 
 *         200:
 *              description: To test Get method 
 */
router.route('/').get(productController.getAllProductController);
 


/**
 * @swagger
 * /api/product/getAll:
 *  get:
 *      summary: This get all products from in-memory 
 *      description: This api is used to fetch data from in-memory
 *      responses: 
 *         200:
 *             description: This api is used to fetch data from in-memory
 *             content:
 *                 application/json:
 *                     schema:
 *                        type: array
 *                        items: 
 *                            $ref: '#/components/schemas/Product'
 */
router.route('/api/product/getAll').get(productController.getAllProductController);
 
router.route('/api/product/create').post(productController.createProductController);
 
router.route('/api/product/update/:id').put(productController.updateProductController);
 
router.route('/api/product/delete/:id').delete(productController.deleteProductController);

router.route('/api/product/search/:keyword').get(productController.getPrdByKeywordController);
 
module.exports = router;