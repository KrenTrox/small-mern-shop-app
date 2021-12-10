const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
	{
		title: { type: String, required: true },
		price: { type: Number, required: true },
		description: { type: String, required: true },
		image: { type: String, required: true },
		sold: { type: Number, required: false },
		uniqueSold: { type: Number, required: false },
	},
	{
		timestamps: true,
	},
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
