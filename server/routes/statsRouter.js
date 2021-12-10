const express = require('express');
const router = express.Router();
const {
	topFiveProductsBySold,
	topFiveProductsByUniqueSold,
} = require('../controllers/productController');
const { getFiveDaysOrders } = require('../controllers/orderController');

router.get('/top-five-products-by-sold', topFiveProductsBySold);
router.get('/top-five-products-by-unique-sold', topFiveProductsByUniqueSold);
router.get('/five-days-orders', getFiveDaysOrders);

module.exports = router;
