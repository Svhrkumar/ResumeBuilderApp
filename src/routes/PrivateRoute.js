import React, { useEffect, useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ component: Component, token, ...rest }) => {
	console.log('login', token);

	return (
		// Show the component only when the user is logged in
		// Otherwise, redirect the user to /signin page
		<Route
			{...rest}
			render={(props) =>
				token !== null ? <Component {...props} /> : <Redirect to='/login' />
			}
		/>
	);
};

export default PrivateRoute;
