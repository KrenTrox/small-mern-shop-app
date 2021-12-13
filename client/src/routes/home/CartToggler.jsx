import { Row, Col, Button, Badge } from 'reactstrap';
import { BsCart3 } from 'react-icons/bs';

const CartToggler = ({ toggleCart, cartOpen, cartCount }) => {
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
		</>
	);
};

export default CartToggler;
