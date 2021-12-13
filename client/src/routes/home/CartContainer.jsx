import CartToggler from './CartToggler';
import CartBody from './CartBody';

const CartContainer = ({
	toggleCart,
	cartOpen,
	cartCount,
	cartItems,
	cartTotal,
	checkoutHandler,
}) => {
	return (
		<>
			<CartToggler
				cartOpen={cartOpen}
				toggleCart={toggleCart}
				cartCount={cartCount}
			/>
			<CartBody
				cartOpen={cartOpen}
				cartCount={cartCount}
				cartItems={cartItems}
				cartTotal={cartTotal}
				checkoutHandler={checkoutHandler}
			/>
		</>
	);
};

export default CartContainer;
