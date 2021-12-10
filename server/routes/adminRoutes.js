const express = require('express');
const router = express.Router();
const {
	createProduct,
	getProducts,
	deleteProduct,
	updateProduct,
} = require('../controllers/productController');

router
	.post('/', createProduct)
	.get('/', getProducts)
	.delete('/', deleteProduct)
	.put('/', updateProduct);

module.exports = router;
