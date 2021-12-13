import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

import CartContainer from './CartContainer';
import ProductsGrid from './ProductsGrid';

function Home() {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [cartOpen, setCartOpen] = useState(false);
	const [cartItems, setCartItems] = useState(
		!!localStorage.getItem('cartItems')
			? JSON.parse(localStorage.getItem('cartItems'))
			: [],
	);
	const [cartTotal, setCartTotal] = useState(
		!!localStorage.getItem('cartTotal')
			? localStorage.getItem('cartTotal')
			: 0,
	);
	const [cartCount, setCartCount] = useState(
		!!localStorage.getItem('cartCount')
			? localStorage.getItem('cartCount')
			: 0,
	);

	const toggleCart = useCallback(() => {
		setCartOpen(!cartOpen);
	}, [cartOpen]);

	const addToCart = useCallback(
		(product) => {
			const newCartItems = [...cartItems];
			const newCartTotal =
				parseFloat(cartTotal) + parseFloat(product.price);
			const newCartCount = parseInt(cartCount) + 1;
			const newItem = {
				id: product._id,
				title: product.title,
				price: product.price,
				quantity: 1,
			};

			if (newCartItems.length > 0) {
				const existingItem = newCartItems.find(
					(item) => item.id === product._id,
				);
				if (existingItem) {
					existingItem.quantity += 1;
				} else {
					newCartItems.push(newItem);
				}
			} else {
				newCartItems.push(newItem);
			}

			localStorage.setItem('cartItems', JSON.stringify(newCartItems));
			localStorage.setItem('cartTotal', newCartTotal);
			localStorage.setItem('cartCount', newCartCount);
			setCartItems(newCartItems);
			setCartTotal(newCartTotal);
			setCartCount(newCartCount);
		},
		[cartItems, cartTotal, cartCount],
	);

	const getProducts = useCallback(() => {
		axios
			.get('http://localhost:5000/admin')
			.then((res) => {
				setProducts(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	const updateProductsByOrder = () => {
		axios
			.put('http://localhost:5000/home', {
				cartItems,
				cartTotal,
				cartCount,
			})
			.then((res) => {
				setCartOpen(false);
				setCartItems([]);
				setCartTotal(0);
				setCartCount(0);
				localStorage.removeItem('cartItems');
				localStorage.removeItem('cartTotal');
				localStorage.removeItem('cartCount');
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const createOrder = () => {
		axios
			.post('http://localhost:5000/home/order', {
				cartItems,
				cartTotal,
				cartCount,
			})
			.then((res) => {})
			.catch((err) => {
				console.log(err);
			});
	};

	const checkoutHandler = () => {
		updateProductsByOrder();
		createOrder();
	};

	useEffect(() => {
		getProducts();
		setLoading(false);

		return () => {
			setLoading(true);
		};
	}, [getProducts]);

	if (loading) {
		return <h1>Loading...</h1>;
	}

	return (
		<>
			<CartContainer
				cartOpen={cartOpen}
				cartItems={cartItems}
				cartTotal={cartTotal}
				cartCount={cartCount}
				toggleCart={toggleCart}
				checkoutHandler={checkoutHandler}
			/>
			<ProductsGrid products={products} addToCart={addToCart} />
		</>
	);
}

export default Home;
