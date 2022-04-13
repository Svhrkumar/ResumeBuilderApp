import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import Form from '../Components/Form';
import Jumbotron from '../Components/Jumbotron';
import Preview from '../Components/Preview';
import { useSelector, useDispatch } from 'react-redux';
import Resume from '../Components/Resume';
import Stepper from '../Components/Stepper';
import { getResumeDetails } from '../redux/actions/personDetails';
import { SLIDER_NEXT, USERLOGIN_SUCCESS } from '../redux/type';
const Home = () => {
	const personDetails = useSelector((state) => state.personDetails);
	const componentState = useSelector((state) => state.componentState);
	const userAuth = useSelector((state) => state.userAuth);
	const [currentStep, setCurrentStep] = useState(1);
	const [hideForm, setHideForm] = useState(false);
	const [updateDetails, setUpdateDetails] = useState(false);

	const dispatch = useDispatch();
	const { Slider } = componentState;
	console.log('Home', personDetails, hideForm, userAuth);
	console.log('Home Slider', Slider, currentStep);

	const labelArray = [
		'Basic Details',
		'Education Details',
		'Experience Details',
		'Career Details',
	];
	const handleTab = (data) => {
		if (hideForm === true && data === 'form') {
			setHideForm(false);
		}
		if (hideForm === false && data === 'preview') {
			setHideForm(true);
		}
		if (data === 'update form') {
			setHideForm(false);
			setUpdateDetails(true);
		}
	};

	const handleStepper = (steps) => {
		dispatch({
			type: SLIDER_NEXT,
			payload: steps + 1,
		});
	};

	useEffect(() => {
		const userData = sessionStorage.getItem('token');
		const user = JSON.parse(userData);
		dispatch({
			type: USERLOGIN_SUCCESS,
			payload: user,
		});
	}, []);
	const { user } = userAuth;

	useEffect(() => {
		const id = user && user._id;
		dispatch(getResumeDetails(id));
	}, [user]);

	return (
		<div>
			<div class='container-fluid'>
				<Jumbotron />
				<div>
					<ul
						class='nav bg-dark'
						style={{
							display: 'flex',
							justifyContent: 'space-evenly',
						}}>
						{personDetails && personDetails.personInfo !== '' ? (
							<li class='nav-item'>
								<a
									class='nav-link active text-white '
									href='#'
									onClick={() => handleTab('update form')}>
									Update Details
								</a>
							</li>
						) : (
							<li class='nav-item'>
								<a
									class='nav-link active text-white '
									href='#'
									onClick={() => handleTab('form')}>
									Add Details
								</a>
							</li>
						)}

						<li class='nav-item'>
							<a
								class='nav-link text-white active'
								href='#'
								onClick={() => handleTab('preview')}>
								Preview
							</a>
						</li>
					</ul>
				</div>

				<div stytle={{ maginTop: '30px' }}>
					<center>
						{!hideForm && (
							<Stepper
								labelArray={labelArray}
								updateStep={handleStepper}
								currentStep={Slider}
								updateDetails={updateDetails}
							/>
						)}
					</center>
				</div>
				<div className='' style={{ display: 'flex', flexWrap: 'wrap' }}>
					<div className='col-2'></div>
					<div className='col-8'>
						{hideForm ? (
							<Resume />
						) : (
							<Form
								handleStep={handleStepper}
								updateDetails={updateDetails}
								currentStep={currentStep}
							/>
						)}
					</div>
					<div className='col-2'></div>
				</div>
			</div>
		</div>
	);
};

export default Home;
