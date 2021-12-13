import { Row, Col, Card, CardText, Button } from 'reactstrap';

const CartBody = ({ cartOpen, cartItems, cartTotal, checkoutHandler }) => {
	return (
		<>
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
		</>
	);
};

export default CartBody;
