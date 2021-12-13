import { Row, Col, Card, CardTitle, CardText, Badge } from 'reactstrap';

const TopFiveSold = ({ topFiveProductsBySold }) => {
	return (
		<>
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
		</>
	);
};

export default TopFiveSold;
