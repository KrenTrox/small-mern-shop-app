const express = require('express');
const router = express.Router();
const { updateProductsByOrder } = require('../controllers/productController');
const { createOrder } = require('../controllers/orderController');

router.put('/', updateProductsByOrder);
router.post('/order', createOrder);

module.exports = router;
