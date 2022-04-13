import React, { useState, useEffect, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	submitPersonInfo,
	updatePersonalInfo,
} from '../../redux/actions/personDetails';
import { SLIDER_NEXT } from '../../redux/type';

const PersonalForm = ({ submitHandler, updateDetails }) => {
	const [pesonalInfoData, setPersonalInfoData] = useState({
		userId: '',
		firstname: '',
		lastname: '',
		city: '',
		pincode: '',
		contact: '',
		email: '',
		website: '',
		linkedIn: '',
		gitHub: '',
		languages: null,
		role: '',
		careerObjective: '',
	});
	const [languages, setLanguages] = useState([
		{
			langId: 1,
			language: '',
		},
	]);

	const handleLanguageFields = (i, e) => {
		const values = [...languages];
		console.log(
			values[i],
			e.target.name,
			(values[i][e.target.name] = e.target.value)
		);
		values[i][e.target.name] = e.target.value;
		setLanguages(values);
	};

	const addLanguage = (e, i) => {
		e.preventDefault();

		setLanguages([
			...languages,
			{
				langId: i + 1,
				language: '',
			},
		]);
	};
	useEffect(() => {
		setPersonalInfoData({
			...pesonalInfoData,

			languages: languages,
		});
	}, [languages]);
	const {
		firstname,
		lastname,
		city,
		contact,
		email,
		pincode,
		website,
		linkedIn,
		gitHub,
		role,
		careerObjective,
	} = pesonalInfoData;
	const dispatch = useDispatch();

	const personDetails = useSelector((state) => state.personDetails);
	const educationDetails = useSelector((state) => state.educationDetails);
	const workDetails = useSelector((state) => state.workDetails);
	const componentState = useSelector((state) => state.componentState);

	const technicalDetails = useSelector((state) => state.technicalDetails);
	const { personInfo } = personDetails;
	const { Slider } = componentState;
	useEffect(() => {
		setPersonalInfoData({ userId: personInfo && personInfo._id });
	}, [personInfo]);
	const Submit = () => {
		dispatch(submitPersonInfo(pesonalInfoData));
		submitHandler();
	};

	const updateHandler = () => {
		dispatch({
			type: SLIDER_NEXT,
			payload: Slider + 1,
		});
		dispatch(updatePersonalInfo(pesonalInfoData));
	};
	console.log('callupdate', updateDetails);
	useEffect(() => {
		if (updateDetails) {
			setPersonalInfoData({
				userId: personInfo._id,
				firstname: personInfo.firstname,
				lastname: personInfo.lastname,
				city: personInfo.city,
				pincode: personInfo.pincode,
				contact: personInfo.contact,
				email: personInfo.email,
				website: personInfo.website,
				linkedIn: personInfo.linkedIn,
				gitHub: personInfo.gitHub,

				role: personInfo.role,
				careerObjective: personInfo.careerObjective,
			});
			setLanguages([...personInfo.languages]);
		}
	}, [updateDetails]);

	console.log('updatepersonalInfo', pesonalInfoData, languages);
	console.log('personal INFO', personInfo, pesonalInfoData, personDetails);
	return (
		<React.Fragment>
			<form
				className='bg-light pt-5 pb-3  mb-4  '
				style={{ paddingLeft: '3rem', paddingRight: '3rem' }}>
				<h4>Career Object</h4>
				<hr />

				<div className='form-row mt-2 '>
					<textarea
						style={{ width: '100%' }}
						name='description'
						value={careerObjective}
						placeholder='eg: Secure a responsible career opportunity to fully utilize my training and skills,while making
                        a significant contribution to the success of the company.....'
						onChange={(e) =>
							setPersonalInfoData({
								...pesonalInfoData,
								careerObjective: e.target.value,
							})
						}></textarea>
				</div>
				<div className='mt-4'>
					<h4>Personal Details</h4>
					<hr />
					<div
						className='form-row'
						style={{
							display: 'flex',
							flexWrap: 'wrap',
							justifyContent: 'space-between',
						}}>
						<div className=' col-md-5 mt-2'>
							<label className='form-label'>Firstname</label>
							<input
								className='form-control '
								type='text'
								placeholder='Enter FirstName'
								value={firstname}
								onChange={(e) =>
									setPersonalInfoData({
										...pesonalInfoData,
										firstname: e.target.value,
									})
								}
							/>
						</div>
						<div className=' col-md-5 mt-2'>
							<label className='form-label'>Lastname</label>
							<input
								className='form-control'
								type='text'
								placeholder='Enter Lastname'
								value={lastname}
								onChange={(e) =>
									setPersonalInfoData({
										...pesonalInfoData,
										lastname: e.target.value,
									})
								}
							/>
						</div>
					</div>

					<div
						className='form-row mt-2'
						style={{
							display: 'flex',
							flexWrap: 'wrap',
							justifyContent: 'space-between',
						}}>
						<div className='col-md-5'>
							<label className='form-label'>City</label>
							<input
								className='form-control'
								type='text'
								placeholder='Enter City'
								value={city}
								onChange={(e) =>
									setPersonalInfoData({
										...pesonalInfoData,
										city: e.target.value,
									})
								}
							/>
						</div>
						<div className='col-md-5'>
							<label className='form-label'>Pincode</label>
							<input
								className='form-control'
								type='text'
								placeholder='Enter Pincode'
								value={pincode}
								onChange={(e) =>
									setPersonalInfoData({
										...pesonalInfoData,
										pincode: e.target.value,
									})
								}
							/>
						</div>
					</div>
					<div
						className='form-row mt-2'
						style={{
							display: 'flex',
							flexWrap: 'wrap',
							justifyContent: 'space-between',
						}}>
						<div className='col-md-5'>
							<label className='form-label'>Contact</label>
							<input
								className='form-control'
								type='text'
								placeholder='Contact No'
								value={contact}
								onChange={(e) =>
									setPersonalInfoData({
										...pesonalInfoData,
										contact: e.target.value,
									})
								}
							/>
						</div>
						<div className='col-md-5'>
							<label className='form-label'>Website</label>
							<input
								className='form-control'
								type='text'
								placeholder='www.example.com'
								value={website}
								onChange={(e) =>
									setPersonalInfoData({
										...pesonalInfoData,
										website: e.target.value,
									})
								}
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
						<div className='col-md-5'>
							<label className='form-label'>Email</label>
							<input
								className='form-control'
								type='email'
								placeholder='Enter Email'
								value={email}
								onChange={(e) =>
									setPersonalInfoData({
										...pesonalInfoData,
										email: e.target.value,
									})
								}
							/>
						</div>
						<div className='col-md-5'>
							<label className='form-label'>Linked In</label>
							<input
								className='form-control'
								type='text'
								placeholder='Enter Linked in profile link'
								value={linkedIn}
								onChange={(e) =>
									setPersonalInfoData({
										...pesonalInfoData,
										linkedIn: e.target.value,
									})
								}
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
						<div className='col-md-5'>
							<label className='form-label'>GitHub Account </label>
							<input
								className='form-control'
								type='text'
								placeholder='Enter Github Account link'
								value={gitHub}
								onChange={(e) =>
									setPersonalInfoData({
										...pesonalInfoData,
										gitHub: e.target.value,
									})
								}
							/>
						</div>
						<div className='col-md-5'>
							<label className='form-label'>Role in Project </label>

							<input
								className='form-control '
								type='text'
								placeholder='eg: Java Developer'
								name='language'
								value={role}
								onChange={(e) =>
									setPersonalInfoData({
										...pesonalInfoData,
										role: e.target.value,
									})
								}
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
						<div className='col-md-5'>
							<label className='form-label'>languages Known </label>
							{languages.map((form, lanId) => (
								<>
									<input
										className='form-control mt-2'
										type='text'
										placeholder='eg: English/Hindi'
										name='language'
										value={form.language}
										onChange={(e) => handleLanguageFields(lanId, e)}
									/>

									{languages.length - 1 === lanId && (
										<button
											className='btn btn-primary mt-3'
											onClick={(e) => addLanguage(e, form.langId)}>
											ADD Language
										</button>
									)}
								</>
							))}
						</div>
					</div>
				</div>

				<div
					className=' mt-4'
					style={{ display: 'flex', flexDirection: 'row-reverse' }}>
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
		</React.Fragment>
	);
};

export default memo(PersonalForm);
