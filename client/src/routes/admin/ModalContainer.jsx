import {
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

const ModalContainer = ({
	toggle,
	modal,
	setModalTitle,
	setEditModal,
	setProductInitialData,
	setNewProduct,
	modalTitle,
	editModal,
	productInitialData,
	newProduct,
	handleChange,
	updateProduct,
	editProductId,
	addNewProduct,
	closeEditModal,
}) => {
	return (
		<>
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
		</>
	);
};

export default ModalContainer;
