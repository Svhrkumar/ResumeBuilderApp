import React, { useState, useEffect } from 'react';
import {
	technicalInfo,
	updateCarrerInfo,
} from '../../redux/actions/personDetails';
import { useSelector, useDispatch } from 'react-redux';
import { SLIDER_NEXT } from '../../redux/type';
const CertificationForm = ({ submitHandler, updateDetails }) => {
	const dispatch = useDispatch();
	const [certification, setCertification] = useState([
		{
			certificateId: 1,
			completedYear: '',
			certificateName: '',
			certificationPartner: '',
		},
	]);
	const componentState = useSelector((state) => state.componentState);
	const { Slider } = componentState;
	const personDetails = useSelector((state) => state.personDetails);
	const [careerObjective, setCareerObjective] = useState('');
	const [tools, setTools] = useState([
		{
			toolId: 1,
			toolName: '',
		},
	]);

	const [skills, setSkills] = useState([
		{
			skillId: 1,
			skillName: '',
		},
	]);

	const [achievements, setAchievements] = useState([
		{
			achId: 1,
			achName: '',
		},
	]);
	const { personInfo } = personDetails;
	const handleCertificationFields = (i, e) => {
		const values = [...certification];
		console.log(
			values[i],
			e.target.name,
			(values[i][e.target.name] = e.target.value)
		);
		values[i][e.target.name] = e.target.value;
		setCertification(values);
	};

	const handleToolsFields = (i, e) => {
		const values = [...tools];
		console.log(
			values[i],
			e.target.name,
			(values[i][e.target.name] = e.target.value)
		);
		values[i][e.target.name] = e.target.value;
		setTools(values);
	};
	const handleSkillsFields = (i, e) => {
		const values = [...skills];
		console.log(
			values[i],
			e.target.name,
			(values[i][e.target.name] = e.target.value)
		);
		values[i][e.target.name] = e.target.value;
		setSkills(values);
	};
	const handleAchivementFields = (i, e) => {
		const values = [...achievements];
		console.log(
			values[i],
			e.target.name,
			(values[i][e.target.name] = e.target.value)
		);
		values[i][e.target.name] = e.target.value;
		setAchievements(values);
	};

	const addCertificate = (e, i) => {
		e.preventDefault();

		setCertification([
			...certification,
			{
				certificateId: i + 1,
				completedYear: '',
				certificateName: '',
				certificationPartner: '',
			},
		]);
	};

	const addTools = (e, i) => {
		e.preventDefault();

		setTools([
			...tools,
			{
				toolId: i + 1,
				toolName: '',
			},
		]);
	};

	const addSkills = (e, i) => {
		e.preventDefault();

		setSkills([
			...skills,
			{
				skillId: i + 1,
				skillName: '',
			},
		]);
	};

	const addAchivement = (e, i) => {
		e.preventDefault();

		setAchievements([
			...achievements,
			{
				achId: i + 1,
				achName: '',
			},
		]);
	};
	const req = {
		userId: personInfo._id,
		userCertifications: certification,
		userExpTools: tools,
		userExpSkills: skills,
		userAchivements: achievements,
	};
	const Submit = () => {
		submitHandler();
		dispatch(technicalInfo(req));
		//
	};
	const technicalDetails = useSelector((state) => state.technicalDetails);
	const { technicalData } = technicalDetails;
	const { userAchivements, userCertifications, userExpSkills, userExpTools } =
		technicalData;
	console.log('callUpdateTech', technicalData);
	const updateHandler = () => {
		dispatch(updateCarrerInfo(req));
		dispatch({
			type: SLIDER_NEXT,
			payload: Slider + 1,
		});
	};
	useEffect(() => {
		if (updateDetails) {
			setTools([...userExpTools]);
			setCertification([...userCertifications]);
			setSkills([...userExpSkills]);
			setAchievements([...userAchivements]);
		}
	}, [updateDetails]);

	console.log('technical', req);

	return (
		<div>
			<form
				className='bg-light pt-3 pb-3 '
				style={{ paddingLeft: '3rem', paddingRight: '3rem' }}>
				<h4 className='mt-5'>Certification Details</h4>
				<hr />
				{certification.map((form, workID) => {
					console.log(certification.length - 1 === workID);
					return (
						<>
							<div
								className='form-row mt-2 '
								style={{
									display: 'flex',
									flexWrap: 'wrap',
									justifyContent: 'space-between',
									flexFlow: 'row',
								}}
								key={workID}>
								<div className='col-md-4'>
									<label className='form-label'> Year of Certification</label>
									<input
										className='form-control'
										type='text'
										value={form.completedYear}
										onChange={(e) => handleCertificationFields(workID, e)}
										name='completedYear'
										placeholder='Completed Year'
									/>
								</div>
								<div className='col-md-4'>
									<label className='form-label'>Certification Name</label>
									<input
										className='form-control'
										type='text'
										value={form.certificateName}
										onChange={(e) => handleCertificationFields(workID, e)}
										name='certificateName'
										placeholder='eg: Java Certification'
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
								}}
								key={workID}>
								<div className='col-md-4'>
									<label className='form-label'>Certification Partner</label>
									<input
										className='form-control'
										type='Certification Partner'
										value={form.certificationPartner}
										onChange={(e) => handleCertificationFields(workID, e)}
										name='certificationPartner'
										placeholder='eg: Udemy'
									/>
								</div>
								{certification.length - 1 === workID && (
									<div className='mt-4'>
										<button
											className='btn btn-primary '
											onClick={(e) => addCertificate(e, form.certificateId)}>
											ADD
										</button>
									</div>
								)}
							</div>
						</>
					);
				})}
				<div className='mt-5'>
					<h4>Tools Details</h4>
				</div>

				<hr />

				<div className='form-row mt-2'>
					<label className='form-label'> Tools Knowledge </label>
					{tools.map((form, id) => (
						<>
							<div className='col-md-4 mt-2'>
								<input
									key={id}
									className='form-control '
									type='text'
									value={form.toolName}
									onChange={(e) => handleToolsFields(id, e)}
									name='toolName'
									placeholder='eg: vscode,postman'
								/>
							</div>

							{tools.length - 1 === id && (
								<div className='col-md-4 mt-4'>
									<button
										className='btn btn-primary '
										onClick={(e) => addTools(e, form.toolId)}>
										ADD Tools
									</button>
								</div>
							)}
						</>
					))}
				</div>
				<div className='mt-5'>
					<h4>Skills Details</h4>
				</div>

				<hr />
				<div className='form-row mt-2'>
					<label className='form-label'> Experience in Skills </label>
					{skills.map((form, id) => (
						<>
							<div className='col-md-4 mt-2' key={id}>
								<input
									className='form-control '
									type='text'
									value={form.skillName}
									onChange={(e) => handleSkillsFields(id, e)}
									name='skillName'
									placeholder='eg: C,C++,Java'
								/>
							</div>

							{skills.length - 1 === id && (
								<div className='col-md-4 mt-4'>
									<button
										className='btn btn-primary '
										onClick={(e) => addSkills(e, form.skillId)}>
										ADD Skills
									</button>
								</div>
							)}
						</>
					))}
				</div>
				<div className='mt-5'>
					<h4>Achievements</h4>
				</div>

				<hr />
				<div className='form-row mt-2'>
					<label className='form-label'> Add Achievements </label>
					{achievements.map((form, id) => (
						<>
							<div className='col-md-6 mt-2' key={id}>
								<input
									className='form-control '
									type='text'
									value={form.achName}
									onChange={(e) => handleAchivementFields(id, e)}
									name='achName'
									placeholder='Enter Your Achievement'
								/>
							</div>

							{achievements.length - 1 === id && (
								<div className='col-md-4 mt-4'>
									<button
										className='btn btn-primary '
										onClick={(e) => addAchivement(e, form.skillId)}>
										ADD More
									</button>
								</div>
							)}
						</>
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
				</div>
			</form>
		</div>
	);
};

export default CertificationForm;
