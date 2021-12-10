import { Outlet, NavLink } from 'react-router-dom';
import {
	Container,
	Navbar,
	NavbarBrand,
	Collapse,
	Nav,
	NavItem,
} from 'reactstrap';
import './assets/css/App.scss';

function App() {
	return (
		<Container className='pt-5 pb-5'>
			<h1 className='mb-3'>Whist shop</h1>
			<Navbar color='light' light expand='md'>
				<NavbarBrand href='/'>Whist</NavbarBrand>
				<Collapse navbar>
					<Nav className='mr-auto' navbar>
						<NavItem>
							<div>
								<NavLink
									to='/'
									className={({ isActive }) =>
										isActive ? 'active' : 'inactive'
									}
								>
									Home
								</NavLink>
							</div>
						</NavItem>
						<NavItem>
							<div>
								<NavLink
									to='/admin'
									className={({ isActive }) =>
										isActive ? 'active' : 'inactive'
									}
								>
									Admin
								</NavLink>
							</div>
						</NavItem>
						<NavItem>
							<div>
								<NavLink
									to='/stats'
									className={({ isActive }) =>
										isActive ? 'active' : 'inactive'
									}
								>
									Stats
								</NavLink>
							</div>
						</NavItem>
					</Nav>
				</Collapse>
			</Navbar>
			<Outlet />
		</Container>
	);
}

export default App;
