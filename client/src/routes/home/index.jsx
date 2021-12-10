import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import {
	Row,
	Col,
	Card,
	CardTitle,
	CardText,
	Button,
	CardImg,
	Badge,
} from 'reactstrap';
import { BsCart3 } from 'react-icons/bs';

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
	}, [getProducts]);

	if (loading) {
		return <h1>Loading...</h1>;
	}

	return (
		<>
			<Row>
				<Col className='d-flex mt-3 justify-content-end'>
					<Button onClick={toggleCart} color='light'>
						<BsCart3 className='me-2' />
						<span>{cartOpen ? 'Close cart' : 'Open cart'}</span>
						{cartCount > 0 && (
							<Badge color='dark' pill className='ms-2'>
								{cartCount}
							</Badge>
						)}
					</Button>
				</Col>
			</Row>

			{cartOpen && (
				<Row
					className='d-flex justify-content-end position-relative'
					style={{ zIndex: 3, top: '10px' }}
				>
					<Col
						sm='auto'
						className='position-absolute'
						style={{ minWidth: '300px' }}
					>
						<Card body>
							{cartItems.length > 0 ? (
								<>
									<CardText tag='div'>
										{cartItems.map((item) => (
											<div
												key={item.id}
												style={{
													display: 'flex',
													justifyContent:
														'space-between',
												}}
											>
												{item.title} x {item.quantity}{' '}
												<span>
													{(
														item.quantity *
														item.price
													).toLocaleString()}
													$
												</span>
											</div>
										))}
									</CardText>

									<hr />
									<CardText
										style={{
											display: 'flex',
											justifyContent: 'space-between',
										}}
									>
										<span>Total:</span>
										<span>
											{cartTotal.toLocaleString()}$
										</span>
									</CardText>

									<Button
										color='success'
										className='mt-3'
										onClick={() => {
											checkoutHandler();
										}}
									>
										Checkout
									</Button>
								</>
							) : (
								<CardText tag='div'>
									<h4 className='text-center'>
										Your cart is empty
									</h4>
								</CardText>
							)}
						</Card>
					</Col>
				</Row>
			)}
			<Row className='mt-3'>
				{products.map((product) => (
					<Col key={product._id} md='3' className='mb-4'>
						<Card body>
							<CardImg
								top
								width='100%'
								src={product.image}
								alt='Card image cap'
							/>
							<hr />
							<CardTitle>{product.title}</CardTitle>
							<CardText>{product.description}</CardText>
							<CardText>
								{product.price.toLocaleString()}$
							</CardText>
							<Button onClick={() => addToCart(product)}>
								Add to cart
							</Button>
						</Card>
					</Col>
				))}
			</Row>
		</>
	);
}

export default Home;
