import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Row, Col, Card, CardTitle, CardText, Badge } from 'reactstrap';

function Stats() {
	const [topFiveProductsBySold, setTopFiveProductsBySold] = useState([]);
	const [topFiveProductsByUniqueSold, setTopFiveProductsByUniqueSold] =
		useState([]);
	const [ordersByFiveDays, setOrdersByFiveDays] = useState([]);
	const [loading, setLoading] = useState(true);

	const getTopFiveProductsBySold = useCallback(async () => {
		const { data } = await axios.get(
			'http://localhost:5000/stats/top-five-products-by-sold',
		);
		setTopFiveProductsBySold(data);
	}, []);

	const getTopFiveProductsByUniqueSold = useCallback(async () => {
		const { data } = await axios.get(
			'http://localhost:5000/stats/top-five-products-by-unique-sold',
		);
		setTopFiveProductsByUniqueSold(data);
	}, []);

	const getOrdersByFiveDays = useCallback(async () => {
		const { data } = await axios.get(
			'http://localhost:5000/stats/five-days-orders',
		);
		setOrdersByFiveDays(data);
	}, []);

	useEffect(() => {
		getTopFiveProductsBySold();
		getTopFiveProductsByUniqueSold();
		getOrdersByFiveDays();
		setLoading(false);
	}, [
		getTopFiveProductsBySold,
		getTopFiveProductsByUniqueSold,
		getOrdersByFiveDays,
	]);

	if (loading) {
		return <h1>Loading...</h1>;
	}
	return (
		<>
			<Row className='mt-3'>
				<Col md='4'>
					<Card>
						<CardTitle
							tag='h3'
							className='border-bottom p-3 text-center'
						>
							Top 5 products by sold
						</CardTitle>
						<CardText tag='div'>
							<Row className='p-3'>
								{topFiveProductsBySold &&
									topFiveProductsBySold.map((product) => (
										<Col
											key={product._id}
											md='12'
											className='mb-3'
											tag='div'
										>
											<h5>
												{product.title} -{' '}
												<Badge color='primary'>
													{product.sold}
												</Badge>
											</h5>
										</Col>
									))}
							</Row>
						</CardText>
					</Card>
				</Col>
				<Col md='4'>
					<Card>
						<CardTitle
							tag='h3'
							className='border-bottom p-3 text-center'
						>
							Top 5 products by unique sold
						</CardTitle>
						<CardText tag='div'>
							<Row className='p-3'>
								{topFiveProductsByUniqueSold &&
									topFiveProductsByUniqueSold.map(
										(product) => (
											<Col
												key={product._id}
												md='12'
												className='mb-3'
												tag='div'
											>
												<h5>
													{product.title} -{' '}
													<Badge color='primary'>
														{product.uniqueSold}
													</Badge>
												</h5>
											</Col>
										),
									)}
							</Row>
						</CardText>
					</Card>
				</Col>
				<Col md='4'>
					<Card>
						<CardTitle
							tag='h3'
							className='border-bottom p-3 text-center'
						>
							Orders by 5 days
						</CardTitle>
						<CardText tag='div'>
							<Row className='p-3'>
								{ordersByFiveDays &&
									ordersByFiveDays.map((order) => (
										<Col
											key={order._id}
											md='12'
											className='mb-3'
											tag='div'
										>
											<h5>
												{order._id} -{' '}
												<Badge color='primary'>
													{order.totalPrice.toLocaleString()}
													$
												</Badge>
											</h5>
										</Col>
									))}
							</Row>
						</CardText>
					</Card>
				</Col>
			</Row>
		</>
	);
}

export default Stats;
