import { Button } from 'reactstrap';
const AddNewBtn = ({ toggle }) => {
	return (
		<>
			<Button color='success' onClick={toggle}>
				Add new
			</Button>
		</>
	);
};

export default AddNewBtn;
