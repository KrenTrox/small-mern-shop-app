import { Row, Col, Card, CardTitle, CardText, Badge } from 'reactstrap';

const FiveDaysOrders = ({ ordersByFiveDays }) => {
	return (
		<>
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
		</>
	);
};

export default FiveDaysOrders;
