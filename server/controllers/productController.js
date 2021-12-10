const asyncHandler = require('express-async-handler');
const Product = require('../models/productModel');

// @desc    Create a product
// @route   POST /admin
// @access  Public
const createProduct = asyncHandler(async (req, res) => {
	const newProduct = new Product({
		title: req.body.title,
		price: req.body.price,
		description: req.body.description,
		image: req.body.image,
	});

	newProduct.save((err, product) => {
		if (err) {
			console.log(err);
		} else {
			console.log(product);
		}

		res.send(product);
	});
});

// @desc    Get all products
// @route   GET /admin
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
	Product.find({}, (err, products) => {
		if (err) {
			return res.send(err);
		}
		res.send(products);
	});
});

// @desc    Delete a product
// @route   DELETE /admin
// @access  Public
const deleteProduct = asyncHandler(async (req, res) => {
	Product.deleteOne({ _id: req.body.id }, (err, product) => {
		if (err) {
			return res.send(err);
		}
		res.send(product);
	});
});

// @desc    Update a product
// @route   PUT /admin
// @access  Public
const updateProduct = asyncHandler(async (req, res) => {
	Product.findOneAndUpdate(
		{ _id: req.body.id },
		{
			title: req.body.newProduct.title,
			price: req.body.newProduct.price,
			description: req.body.newProduct.description,
			image: req.body.newProduct.image,
		},
		{ new: true },
		(err, product) => {
			if (err) {
				return res.send(err);
			}
			res.send(product);
		},
	);
});

// @desc    Products data update (how many sold and how many unique sold)
// @route   PUT /home
// @access  Public
const updateProductsByOrder = asyncHandler(async (req, res) => {
	const { cartItems, cartCount, cartTotal } = req.body;

	cartItems.forEach((item, index) => {
		const { id, quantity } = item;
		Product.findOneAndUpdate(
			{ _id: id },
			{
				$inc: {
					sold: parseInt(quantity),
					uniqueSold: parseInt(quantity) > 1 ? 1 : 0,
				},
			},
			{ new: true },
			(err, product) => {
				if (err) {
					return res.send(err);
				}
			},
		);
	});
	res.send('all products updated');
});

// @desc    Top 5 products by sold
// @route   GET /stats/top-five-products-by-sold
// @access  Public
const topFiveProductsBySold = asyncHandler(async (req, res) => {
	Product.find({})
		.sort({ sold: -1 })
		.limit(5)
		.exec((err, products) => {
			if (err) {
				return res.send(err);
			}
			res.send(products);
		});
});

// @desc    Top 5 products by unique sold
// @route   GET /stats/top-five-products-by-unique-sold
// @access  Public
const topFiveProductsByUniqueSold = asyncHandler(async (req, res) => {
	Product.find({})
		.sort({ uniqueSold: -1 })
		.limit(5)
		.exec((err, products) => {
			if (err) {
				return res.send(err);
			}
			res.send(products);
		});
});

module.exports = {
	getProducts,
	createProduct,
	deleteProduct,
	updateProduct,
	updateProductsByOrder,
	topFiveProductsBySold,
	topFiveProductsByUniqueSold,
};
