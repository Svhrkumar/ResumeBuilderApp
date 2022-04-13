import React from 'react';
import { Navbar, Container } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { logoutHandler } from '../redux/actions/personDetails';
import './navbar.css';
const NavbarComp = () => {
	const userAuth = useSelector((state) => state.userAuth);
	const { user } = userAuth;
	console.log(userAuth);

	const history = useHistory();
	const dispatch = useDispatch();
	const handleLogout = () => {
		sessionStorage.removeItem('token');
		dispatch(logoutHandler());
		history.push('/login');
	};
	return (
		<Navbar className='nav-bar'>
			<Container className='container-md'>
				<Navbar.Brand href='#home' style={{ color: 'whitesmoke' }}>
					Resume Builder
				</Navbar.Brand>
			</Container>

			<ul class='navbar-nav mr-auto mt-2 mt-lg-0 pr-4'>
				<li class='nav-item  mr-2 ' style={{ width: '100px' }}>
					<Link class='nav-link ' to='/home'>
						Home <span class='sr-only'>(current)</span>
					</Link>
				</li>
				<li class='nav-item  mr-2' style={{ width: '100px' }}>
					<a class='nav-link' href='#'>
						{user && user.firstname} {''}
					</a>
				</li>
				<li class='nav-item  mr-2' style={{ width: '100px' }}>
					<a class='nav-link' href='#' onClick={handleLogout}>
						logout
					</a>
				</li>
			</ul>
		</Navbar>
	);
};

export default NavbarComp;
