import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	submitEducationInfo,
	updateEducationInfo,
} from '../../redux/actions/personDetails';
import { SLIDER_NEXT } from '../../redux/type';

const EducationForm = ({ submitHandler, updateDetails }) => {
	const [educationData, setEducationData] = useState([
		{
			eduId: 1,
			degreeSchoolName: '',
			degreeDegreeType: '',
			degreeFromDate: '',
			degreeToDate: '',
			degreeAchievements: '',
		},
	]);
	const personDetails = useSelector((state) => state.personDetails);
	const { personInfo } = personDetails;
	const [addDegree, setAddDegree] = useState(0);
	const educationDetails = useSelector((state) => state.educationDetails);
	const dispatch = useDispatch();
	const componentState = useSelector((state) => state.componentState);

	const { Slider } = componentState;
	const handleEducationFields = (i, e) => {
		const values = [...educationData];
		console.log(
			values[i],
			e.target.name,
			(values[i][e.target.name] = e.target.value)
		);
		values[i][e.target.name] = e.target.value;
		setEducationData(values);
	};
	const addEducation = (e, i) => {
		e.preventDefault();

		setEducationData([
			...educationData,
			{
				eduId: i + 1,
				degreeSchoolName: '',
				degreeDegreeType: '',
				degreeFromDate: '',
				degreeToDate: '',
				degreeAchievements: '',
			},
		]);
	};
	const updateHandler = () => {
		const req = {
			userId: personInfo._id,
			educationInfo: educationData,
		};

		dispatch(updateEducationInfo(req));
		dispatch({
			type: SLIDER_NEXT,
			payload: Slider + 1,
		});
	};
	const Submit = () => {
		const req = {
			userId: personInfo._id,
			educationInfo: educationData,
		};

		dispatch(submitEducationInfo(req));
		submitHandler();
	};
	const { studyInfo } = educationDetails;
	console.log('Study INFO', studyInfo);
	console.log('adddegree', addDegree);
	console.log('education', educationData);
	useEffect(() => {
		if (updateDetails) {
			setEducationData([...studyInfo.educationInfo]);
		}
	}, [updateDetails]);

	console.log('calleduUpdate', educationData);

	return (
		<>
			<form
				className='bg-light pt-3 pb-3 '
				style={{ paddingLeft: '3rem', paddingRight: '3rem' }}>
				<div className='mt-3'>
					<h4>Add Education Info</h4>
				</div>
				<hr style={{ marginTop: '0px' }} />
				{educationData.map((data, eduId) => (
					<div key={data.eduId}>
						<div
							className='form-row mt-2 '
							style={{
								display: 'flex',
								flexWrap: 'wrap',
								justifyContent: 'space-between',
								flexFlow: 'row',
							}}>
							<div className='col-md-3'>
								<label className='form-label'>Start Year</label>
								<input
									className='form-control'
									type='text'
									placeholder='Start Year'
									value={data.degreeFromDate}
									name='degreeFromDate'
									onChange={(e) => handleEducationFields(eduId, e)}
								/>
							</div>
							<div className='col-md-3'>
								<label className='form-label'>End Year</label>
								<input
									className='form-control'
									type='text'
									placeholder='End year'
									value={data.degreeToDate}
									name='degreeToDate'
									onChange={(e) => handleEducationFields(eduId, e)}
								/>
							</div>
						</div>
						<div
							className='form-row mt-2 '
							style={{
								display: 'flex',
								flexWrap: 'wrap',
								justifyContent: 'space-between',
								flexFlow: 'row',
							}}>
							<div className='col-md-7'>
								<label className='form-label'>School or College Name</label>
								<input
									className='form-control'
									type='text'
									placeholder='Enter School or College'
									value={data.degreeSchoolName}
									name='degreeSchoolName'
									onChange={(e) => handleEducationFields(eduId, e)}
								/>
							</div>
							<div className='col-md-3'>
								<label className='form-label'>Degree Type</label>
								<input
									className='form-control'
									type='text'
									placeholder='Enter Degree'
									value={data.degreeDegreeType}
									name='degreeDegreeType'
									onChange={(e) => handleEducationFields(eduId, e)}
								/>
							</div>
						</div>
						<div className='mt-2'>
							<div className='col-md-5'>
								<label className='form-label'>Achievements</label>
								<input
									className='form-control'
									type='text'
									placeholder='Enter Degree'
									value={data.degreeAchievements}
									name='degreeAchievements'
									onChange={(e) => handleEducationFields(eduId, e)}
								/>
							</div>
						</div>
						{educationData.length - 1 === eduId && (
							<button
								className='btn btn-primary mt-3'
								onClick={(e) => addEducation(e, data.eduId)}>
								ADD Degree
							</button>
						)}

						<hr style={{ marginTop: '0px', margin: '10px 5px' }} />
					</div>
				))}

				<div
					className='mt-3'
					style={{
						display: 'flex',
						flexDirection: 'row-reverse',
						justifyContent: 'space-between',
					}}>
					{updateDetails ? (
						<button className='btn btn-primary' onClick={updateHandler}>
							Update
						</button>
					) : (
						<button className='btn btn-primary' onClick={Submit}>
							Next
						</button>
					)}
				</div>
			</form>
		</>
	);
};

export default EducationForm;
