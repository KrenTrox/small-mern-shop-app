import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import AddNewBtn from './AddNewBtn';
import ModalContainer from './ModalContainer';
import ProductsTable from './ProductsTable';

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
				<AddNewBtn toggle={toggle} />
				<ModalContainer
					toggle={toggle}
					modal={modal}
					setModalTitle={setModalTitle}
					setEditModal={setEditModal}
					setProductInitialData={setProductInitialData}
					setNewProduct={setNewProduct}
					modalTitle={modalTitle}
					editModal={editModal}
					productInitialData={productInitialData}
					newProduct={newProduct}
					handleChange={handleChange}
					updateProduct={updateProduct}
					editProductId={editProductId}
					addNewProduct={addNewProduct}
					closeEditModal={closeEditModal}
				/>
			</div>
			<ProductsTable
				products={products}
				editProduct={editProduct}
				deleteProduct={deleteProduct}
			/>
		</>
	);
}

export default Admin;
