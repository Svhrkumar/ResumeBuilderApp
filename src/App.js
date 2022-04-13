import './App.css';
import NavbarComp from './Components/Navbar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Home from './pages/Home';
import ContentMaker from './pages/ContentMaker';
import Login from './pages/Login';
import Register from './pages/Register';
import PrivateRoute from './routes/PrivateRoute';
import { useSelector } from 'react-redux';
import ResumePreview from './pages/ResumePreview';

function App() {
	const userAuth = useSelector((state) => state.userAuth);
	const [userToken, setUserToken] = useState();

	console.log('login', userAuth);
	const token = sessionStorage.getItem('token');
	const user = JSON.parse(token);
	return (
		<Router>
			<div className='App'>
				<NavbarComp />
				<Switch>
					<PrivateRoute exact path='/home' token={user} component={Home} />
					<PrivateRoute
						exact
						path='/resume'
						token={user}
						component={ResumePreview}
					/>
					<Route excat path='/login' component={Login} />

					<Route excat path='/contentmaker' component={ContentMaker} />
				</Switch>
			</div>
		</Router>
	);
}

export default App;
