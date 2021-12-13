import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Row } from 'reactstrap';

import TopFiveSold from './TopFiveSold';
import TopFiveUniqueSold from './TopFiveUniqueSold';
import FiveDaysOrders from './FiveDaysOrders';

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
				<TopFiveSold topFiveProductsBySold={topFiveProductsBySold} />
				<TopFiveUniqueSold
					topFiveProductsByUniqueSold={topFiveProductsByUniqueSold}
				/>
				<FiveDaysOrders ordersByFiveDays={ordersByFiveDays} />
			</Row>
		</>
	);
}

export default Stats;
