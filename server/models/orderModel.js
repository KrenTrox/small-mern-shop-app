const mongoose = require('mongoose');

const orderSchema = mongoose.Schema(
	{
		products: { type: Array, required: true },
		totalPrice: { type: Number, required: true },
		productsCount: { type: Number, required: true },
	},
	{
		timestamps: true,
	},
);

const Order = mongoose.model('Order', orderSchema, 'orders');

module.exports = Order;
