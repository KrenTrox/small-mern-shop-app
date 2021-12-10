const asyncHandler = require('express-async-handler');
const Order = require('../models/orderModel');

// @desc    Create a order
// @route   POST /home/order
// @access  Public
const createOrder = asyncHandler(async (req, res) => {
	const { cartItems, cartTotal, cartCount } = req.body;
	const newOrder = new Order({
		products: cartItems,
		totalPrice: parseInt(cartTotal),
		productsCount: parseInt(cartCount),
	});

	newOrder.save((err, product) => {
		if (err) {
			console.log(err);
		} else {
			console.log(product);
		}

		res.send(product);
	});
});

// @desc    Get orders of each day in the past 5 days
// @route   GET /home/order
// @access  Public
const getFiveDaysOrders = asyncHandler(async (req, res) => {
	Order.aggregate([
		{
			$project: {
				_id: 0,
				date: {
					$dateToString: { format: '%Y-%m-%d', date: '$createdAt' },
				},
				totalPrice: 1,
			},
		},
		{
			$group: {
				_id: '$date',
				totalPrice: { $sum: '$totalPrice' },
			},
		},
		{
			$sort: {
				_id: -1,
			},
		},
		{
			$limit: 5,
		},
	]).then((orders) => {
		res.send(orders);
	});
});

module.exports = {
	createOrder,
	getFiveDaysOrders,
};
