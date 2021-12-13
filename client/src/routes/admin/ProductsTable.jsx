import { Table, Button } from 'reactstrap';

const ProductsTable = ({ products, editProduct, deleteProduct }) => {
	return (
		<>
			<Table responsive className='mt-3'>
				<thead>
					<tr>
						<th>#</th>
						<th>Title</th>
						<th>Price</th>
						<th>Description</th>
						<th>Image</th>
						<th>Options</th>
					</tr>
				</thead>
				<tbody>
					{products &&
						products.map((product, index) => (
							<tr key={product._id}>
								<th scope='row'>{index + 1}</th>
								<td>{product.title}</td>
								<td>
									<b>
										Price: {product.price.toLocaleString()}$
									</b>
								</td>
								<td>{product.description}</td>
								<td>
									<picture>
										<img
											src={product.image}
											alt={product.title}
											style={{ maxWidth: '100%' }}
										/>
									</picture>
								</td>
								<td>
									<Button
										color='warning'
										className='w-100 mb-2'
										onClick={() => {
											editProduct(product._id);
										}}
									>
										Edit
									</Button>
									<Button
										color='danger'
										className='w-100'
										onClick={() =>
											deleteProduct(product._id)
										}
									>
										Delete
									</Button>
								</td>
							</tr>
						))}
				</tbody>
			</Table>
		</>
	);
};

export default ProductsTable;
