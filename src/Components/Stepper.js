import React from 'react';
import Step from './Step';
import './stepper.css';
const Stepper = ({ labelArray, updateStep, currentStep, updateDetails }) => {
	return (
		<div className='stepWrapper'>
			{labelArray.map((item, index) => {
				console.log(currentStep === index + 1);
				return (
					<Step
						key={index}
						index={index}
						label={item}
						updateStep={updateStep}
						currentStep={currentStep}
						updateDetails={updateDetails}
						selected={currentStep === index + 1}></Step>
				);
			})}
		</div>
	);
};

export default Stepper;
