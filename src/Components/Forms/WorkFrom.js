import React, { useState, useEffect, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	SkillsInfo,
	submitWorkInfo,
	updateWorkInfo,
} from '../../redux/actions/personDetails';
import Datepicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Select from 'react-select';
import axios from 'axios';
import { SKILLSLISTS, SLIDER_NEXT } from '../../redux/type';
const WorkFrom = ({ submitHandler, updateDetails }) => {
	const [workHistoryData, setWorkHistoryData] = useState([]);
	const [task1, setTask1] = useState('');
	const [task2, setTask2] = useState('');
	const [task3, setTask3] = useState('');
	const [task4, setTask4] = useState('');
	const [task5, setTask5] = useState('');
	const [taskCount, setTaskCount] = useState(1);
	const [selectedOption, setSelectedOption] = useState(null);
	const [fields, setFields] = useState([]);
	var response = [];
	const componentState = useSelector((state) => state.componentState);
	const { Slider } = componentState;

	const [workInfo, setWorkInfo] = useState([
		{
			workId: 1,
			startDate: '',
			endDate: '',
			companyName: '',
			location: '',
			role: '',
			clientName: '',
			projectName: '',
			description: '',
			responsibility: [],
			technologies: null,
			task1: '',
			task2: '',
			task3: '',
			task4: '',
			task5: '',
		},
	]);
	// const [skillsList, setSkillsList] = useState();
	const dispatch = useDispatch();
	const skillsApiDetails = useSelector((state) => state.skillsApiDetails);
	const workDetails = useSelector((state) => state.workDetails);
	const { skillsLists } = skillsApiDetails;
	const personDetails = useSelector((state) => state.personDetails);
	const { personInfo } = personDetails;

	const {
		startDate,
		endDate,
		companyName,
		location,
		role,
		clientName,
		projectName,
		description,
		technologies,
		responsibility,
	} = workInfo;

	console.log('callWrokUpdate', workDetails.workData);
	const { workData } = workDetails;
	useEffect(() => {
		dispatch(SkillsInfo());
	}, []);

	// useEffect(() => {
	// 	setWorkHistoryData([
	// 		...responsibility,
	// 		(workInfo.task1,
	// 		workInfo.task2,
	// 		workInfo.task3,
	// 		workInfo.task4,
	// 		workInfo.task5),
	// 	]);
	// }, [workInfo]);

	const Submit = () => {
		const req = {
			userId: personInfo._id,
			workInfo: workInfo,
		};
		dispatch(submitWorkInfo(req));
		submitHandler();
	};

	const updateHandler = () => {
		const req = {
			userId: personInfo._id,
			workInfo: workInfo,
		};
		console.log(req);
		dispatch(updateWorkInfo(req));

		dispatch({
			type: SLIDER_NEXT,
			payload: Slider + 1,
		});
	};

	const handleChange = (selectedOption) => {
		setSelectedOption(selectedOption);
		console.log(selectedOption);
	};

	const handleWorkFields = (i, e) => {
		const values = [...workInfo];
		console.log(
			values[i],
			e.target.name,
			(values[i][e.target.name] = e.target.value)
		);
		values[i][e.target.name] = e.target.value;
		setWorkInfo(values);
	};
	const addWork = (e, i) => {
		e.preventDefault();
		setTaskCount(1);

		setWorkInfo([
			...workInfo,
			{
				workId: i + 1,
				startDate: '',
				endDate: '',
				companyName: '',
				location: '',
				role: '',
				clientName: '',
				projectName: '',
				description: '',
				task1: '',
				task2: '',
				task3: '',
				task4: '',
				task5: '',
				responsibility: [],
				technologies: null,
			},
		]);
	};
	const addFields = (e) => {
		e.preventDefault();
		if (taskCount <= 5) {
			setTaskCount(taskCount + 1);
		}
	};
	console.log('work', workData);
	useEffect(() => {
		if (updateDetails) {
			setWorkInfo([...workData.workHistoryInfo]);
		}
	}, [updateDetails]);

	console.log('responsibility', responsibility, fields);
	console.log('Work INFO', workInfo);
	return (
		<React.Fragment>
			<form
				className='bg-light pt-3 pb-3 '
				style={{ paddingLeft: '3rem', paddingRight: '3rem' }}>
				<h4>Work Experience</h4>
				<hr />
				{workInfo &&
					workInfo.map((form, workID) => (
						<div>
							<div
								className='form-row mt-2 '
								style={{
									display: 'flex',
									flexWrap: 'wrap',
									justifyContent: 'space-between',
									flexFlow: 'row',
								}}>
								<div className='col-md-4'>
									<label className='form-label'>Start Year</label>
									<input
										type='date'
										value={form.startDate}
										onChange={(e) => handleWorkFields(workID, e)}
										dateFormat='dd/MM/yyyy'
										name='startDate'
									/>
								</div>
								<div className='col-md-4 mr-2'>
									<label className='form-label'>End Year</label>
									<input
										type='date'
										value={form.endDate}
										onChange={(e) => handleWorkFields(workID, e)}
										dateFormat='dd/MM/yyyy'
										name='endDate'
									/>
								</div>
							</div>
							<div
								className='form-row mt-3 '
								style={{
									display: 'flex',
									flexWrap: 'wrap',
									justifyContent: 'space-between',
									flexFlow: 'row',
								}}>
								<div className='col-md-5'>
									<label className='form-label'>Company Name</label>
									<input
										className='form-control'
										type='text'
										placeholder='Enter Company'
										value={form.companyName}
										name='companyName'
										onChange={(e) => handleWorkFields(workID, e)}
									/>
								</div>
								<div className='col-md-5'>
									<label className='form-label'>Location</label>
									<input
										className='form-control'
										type='text'
										placeholder='Enter Location'
										value={form.location}
										name='location'
										onChange={(e) => handleWorkFields(workID, e)}
									/>
								</div>
							</div>
							<div
								className='mt-2'
								style={{
									display: 'flex',
									flexWrap: 'wrap',
									justifyContent: 'space-between',
									flexFlow: 'row',
								}}>
								<div className='col-md-5'>
									<label className='form-label'>Role</label>
									<input
										className='form-control'
										type='text'
										placeholder='Enter Role'
										value={form.role}
										name='role'
										onChange={(e) => handleWorkFields(workID, e)}
									/>
								</div>
								<div className='col-md-5'>
									<label className='form-label'>Client</label>
									<input
										className='form-control'
										type='text'
										placeholder='Enter Client Name'
										value={form.clientName}
										name='clientName'
										onChange={(e) => handleWorkFields(workID, e)}
									/>
								</div>
							</div>
							<div
								className='mt-2'
								style={{
									display: 'flex',
									flexWrap: 'wrap',
									justifyContent: 'space-between',
									flexFlow: 'row',
								}}>
								<div className='col-md-5'>
									<label className='form-label'>Project Name</label>
									<input
										className='form-control'
										type='text'
										placeholder='Enter Project Name'
										value={form.projectName}
										name='projectName'
										onChange={(e) => handleWorkFields(workID, e)}
									/>
								</div>
							</div>
							<div className='form-row'>
								<div className='col'>
									<label className='form-label'>Work Description</label>
									<textarea
										style={{ width: '100%' }}
										value={form.description}
										name='description'
										onChange={(e) => handleWorkFields(workID, e)}></textarea>
								</div>
								<div className='col'>
									<label className='form-label'>Technologies used</label>
									<Select
										isMulti
										options={skillsLists}
										onChange={handleChange}
										name='task2'
										value={form.selectedOption}
									/>
								</div>

								<div className='col mt-3'>
									<div className='row'>
										<div className='col '>
											<label className='form-label'>Add responsibilities</label>

											<input
												className='form-control'
												style={{ width: '100%' }}
												value={form.task1}
												name='task1'
												onChange={(e) => handleWorkFields(workID, e)}
												placeholder='Task 1'
											/>

											<input
												className='form-control mt-2'
												style={{ width: '100%' }}
												value={form.task2}
												name='task2'
												onChange={(e) => handleWorkFields(workID, e)}
												placeholder='Task 2'
											/>

											<input
												className='form-control mt-2'
												style={{ width: '100%' }}
												value={form.task3}
												onChange={(e) => handleWorkFields(workID, e)}
												placeholder='Task 3'
												name='task3'
											/>

											<input
												className='form-control mt-2'
												style={{ width: '100%' }}
												value={form.task4}
												onChange={(e) => handleWorkFields(workID, e)}
												placeholder='Task 4'
												name='task4'
											/>

											<input
												className='form-control mt-2'
												style={{ width: '100%' }}
												value={form.task5}
												onChange={(e) => handleWorkFields(workID, e)}
												placeholder='Task 5'
												name='task5'
											/>
										</div>
									</div>
								</div>
							</div>
							{workInfo.length - 1 === workID && (
								<div className='mt-2'>
									<button
										className='btn btn-primary '
										onClick={(e) => addWork(e, workID)}>
										ADD Work
									</button>
								</div>
							)}

							{workInfo.length > 0 ? <hr className='mt-3'></hr> : ''}
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
		</React.Fragment>
	);
};

export default memo(WorkFrom);
