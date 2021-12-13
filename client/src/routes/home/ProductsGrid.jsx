import {
	Row,
	Col,
	Card,
	CardTitle,
	CardText,
	Button,
	CardImg,
} from 'reactstrap';

const ProductsGrid = ({ products, addToCart }) => {
	return (
		<>
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
};

export default ProductsGrid;
