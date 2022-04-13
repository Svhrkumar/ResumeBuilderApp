import React from 'react';
import './stepper.css';
import tick from '../image/checkmark-circle.svg';
const Step = ({
	label,
	index,
	updateStep,
	selected,
	currentStep,
	updateDetails,
}) => {
	console.log('selected', selected);
	return (
		<div className={'stepBlock' + ' ' + (selected ? 'selected' : '')}>
			<div
				className='circleWrapper'
				onClick={() => (updateDetails ? updateStep(index) : '')}>
				<div className={'circle'}>
					{index + 1 < currentStep ? (
						<img syle={{ color: 'white' }} src={tick} />
					) : (
						<center>{index + 1}</center>
					)}
				</div>
			</div>
			<span className='content'>{label}</span>
		</div>
	);
};

export default Step;
