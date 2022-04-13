import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	submitEducationInfo,
	submitPersonInfo,
	submitWorkInfo,
} from '../redux/actions/personDetails';
import { personalInfo } from '../redux/reducers/personalInfoReducer';
import { ADD_PERSONAL_INFO, SLIDER_NEXT } from '../redux/type';
import CertificationForm from './Forms/CertificationForm';
import EducationForm from './Forms/EducationForm';
import PersonalForm from './Forms/PersonalForm';
import WorkFrom from './Forms/WorkFrom';
const Form = ({ handleStep, updateDetails, currentStep }) => {
	const educationDetails = useSelector((state) => state.educationDetails);
	const componentState = useSelector((state) => state.componentState);
	const [slide, setSlide] = useState(0);
	const { studyInfo } = educationDetails;
	const { Slider } = componentState;
	const dispatch = useDispatch();
	console.log('Form Slider', Slider, slide);

	useEffect(() => {
		console.log('sideeffect');
		handleStep(slide);
	}, [slide]);

	const submitHandler = (data) => {
		dispatch({
			type: SLIDER_NEXT,
			payload: data + 1,
		});
	};

	return (
		<React.Fragment>
			{Slider === 1 ? (
				<PersonalForm
					submitHandler={submitHandler}
					updateDetails={updateDetails}
				/>
			) : (
				<React.Fragment>
					{Slider === 2 ? (
						<EducationForm
							submitHandler={submitHandler}
							updateDetails={updateDetails}
						/>
					) : (
						<React.Fragment>
							{Slider === 3 ? (
								<WorkFrom
									submitHandler={submitHandler}
									updateDetails={updateDetails}
								/>
							) : (
								<>
									{Slider === 4 ? (
										<CertificationForm
											submitHandler={submitHandler}
											updateDetails={updateDetails}
										/>
									) : (
										''
									)}
								</>
							)}
						</React.Fragment>
					)}
				</React.Fragment>
			)}
		</React.Fragment>
	);
};

export default Form;
