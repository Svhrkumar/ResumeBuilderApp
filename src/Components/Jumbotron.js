import React, { useEffect } from 'react';

const Jumbotron = () => {
	useEffect(() => {}, []);
	return (
		<div class='p-5  bg-light rounded-3 pl-2 pr-2 mt-1'>
			<div class='container-fluid py-5'>
				<h1 class='display-5 fw-bold'>Welcome to Resume Builder</h1>
				<p class='col-md-8 fs-4'>Create Your Resume and start your Career</p>
			</div>
		</div>
	);
};

export default Jumbotron;
