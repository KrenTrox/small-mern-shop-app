import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import {
	Table,
	Button,
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Form,
	FormGroup,
	Label,
	Input,
} from 'reactstrap';

function Admin() {
	const [products, setProducts] = useState([]);
	const [editProductId, setEditProductId] = useState(null);
	const [editModal, setEditModal] = useState(false);
	const [modal, setModal] = useState(false);
	const [productInitialData, setProductInitialData] = useState({
		title: 'Title',
		price: 'Price',
		description: 'Description',
		image: 'Image URL',
	});
	const [modalTitle, setModalTitle] = useState('Add Product');
	const [newProduct, setNewProduct] = useState({
		title: '',
		price: '',
		description: '',
		image: '',
	});
	const [loading, setLoading] = useState(true);

	const toggle = () => setModal(!modal);

	const handleChange = (e) => {
		setNewProduct({
			...newProduct,
			[e.target.name]: e.target.value,
		});
	};

	const addNewProduct = () => {
		axios
			.post('http://localhost:5000/admin', newProduct)
			.then((res) => {
				setProducts([...products, res.data]);
				setNewProduct({
					title: '',
					price: '',
					description: '',
					image: '',
				});

				toggle();
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const getProducts = useCallback(() => {
		axios
			.get('http://localhost:5000/admin')
			.then((res) => {
				setProducts(res.data);
				setLoading(false);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	const deleteProduct = (id) => {
		axios
			.delete(`http://localhost:5000/admin`, { data: { id } })
			.then((res) => {
				setProducts(products.filter((product) => product._id !== id));
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const editProduct = (id) => {
		setEditProductId(id);
		const product = products.find((product) => product._id === id);
		setModalTitle('Edit Product');
		setProductInitialData(product);
		setNewProduct({
			title: product.title,
			price: product.price,
			description: product.description,
			image: product.image,
		});
		setEditModal(true);
		toggle();
	};

	const closeEditModal = () => {
		setEditModal(false);
		setEditProductId(null);
		toggle();
	};

	const updateProduct = (id) => {
		axios
			.put(`http://localhost:5000/admin`, {
				id,
				newProduct,
			})
			.then((res) => {
				const updatedProducts = products.map((product) => {
					if (product._id === id) {
						return res.data;
					}
					return product;
				});
				setProducts(updatedProducts);
				closeEditModal();
			})
			.catch((err) => {
				console.log(err);
			});
	};

	useEffect(() => {
		getProducts();
	}, [getProducts]);

	if (loading) {
		return <h1>Loading...</h1>;
	}

	return (
		<>
			<div className='d-grid gap-2 d-md-flex justify-content-md-end mt-3'>
				<Button color='success' onClick={toggle}>
					Add new
				</Button>
				<Modal
					toggle={toggle}
					isOpen={modal}
					onClosed={() => {
						setModalTitle('Add product');
						setEditModal(false);
						setProductInitialData({
							title: 'Title',
							price: 'Price',
							description: 'Description',
							image: 'Image URL',
						});
						setNewProduct({
							title: '',
							price: '',
							description: '',
							image: '',
						});
					}}
				>
					<ModalHeader>{modalTitle}</ModalHeader>
					<ModalBody>
						<Form>
							<FormGroup>
								<Label for='title'>Title</Label>
								<Input
									type='text'
									name='title'
									id='title'
									placeholder={productInitialData.title}
									value={newProduct.title}
									onChange={handleChange}
								/>
							</FormGroup>
							<FormGroup>
								<Label for='price'>Price</Label>
								<Input
									type='text'
									name='price'
									id='price'
									placeholder={productInitialData.price}
									value={newProduct.price}
									onChange={handleChange}
								/>
							</FormGroup>
							<FormGroup>
								<Label for='description'>Description</Label>
								<Input
									type='textarea'
									name='description'
									id='description'
									placeholder={productInitialData.description}
									maxLength='200'
									value={newProduct.description}
									onChange={handleChange}
								/>
							</FormGroup>
							<FormGroup>
								<Label for='image'>Image</Label>
								<Input
									type='text'
									name='image'
									id='image'
									placeholder={productInitialData.image}
									value={newProduct.image}
									onChange={handleChange}
								/>
							</FormGroup>
						</Form>
					</ModalBody>
					<ModalFooter>
						<Button
							color={editModal ? 'primary' : 'success'}
							onClick={
								editModal
									? () => updateProduct(editProductId)
									: () => addNewProduct()
							}
						>
							{editModal ? 'Update product' : 'Add product'}
						</Button>
						<Button onClick={() => closeEditModal()}>Close</Button>
					</ModalFooter>
				</Modal>
			</div>
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
}

export default Admin;
