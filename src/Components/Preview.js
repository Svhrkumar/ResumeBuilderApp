import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import roles from '../JSON-Data/data.json';
import tech from '../JSON-Data/tech.json';
import college from '../JSON-Data/college.json';
import { skills } from '../JSON-Data/jdsonData';
import circle from '../image/circle-solid.svg';
import moment from 'moment';
import { getResumeDetails } from '../redux/actions/personDetails';
import Pdf from 'react-to-pdf';
const Preview = () => {
	const personDetails = useSelector((state) => state.personDetails);
	const educationDetails = useSelector((state) => state.educationDetails);
	const workDetails = useSelector((state) => state.workDetails);
	const technicalDetails = useSelector((state) => state.technicalDetails);
	const userAuth = useSelector((state) => state.userAuth);
	const userAuthReg = useSelector((state) => state.userAuthReg);

	const { user } = userAuth;

	console.log('loggedIn', user, userAuth);
	const [pageHeight, setPageHeight] = useState();
	const [pageWidth, setPageWidth] = useState();
	const [secondPage, setSecondPage] = useState(false);
	const dispatch = useDispatch();
	var previewHg = pageHeight;
	const { personInfo } = personDetails;
	const { workData } = workDetails;

	const { studyInfo } = educationDetails;

	const { technicalData } = technicalDetails;
	

	console.log(
		'page---------------',
		pageHeight,
		educationDetails,
		personInfo,
		workDetails,
		technicalData
	);

	const ref = useRef();

	useEffect(() => {
		const id = user && user._id;
		dispatch(getResumeDetails(id));
		setPageHeight(ref.current.clientHeight);
		setPageWidth(ref.current.clientWidth);
	}, [user]);
	// Sections components
	const ObjectiveSection = () => (
		<div className=''>
			<p style={{ fontSize: '12px' }}>
				{personInfo && personInfo.careerObjective}
			</p>
		</div>
	);
	const EducationSection = () => (
		<div>
			<h5 style={{ marginTop: '1rem', color: '#1a36a4' }}>Education</h5>
			<hr style={{ margin: '0px' }} />
			{studyInfo &&
				studyInfo.educationInfo &&
				studyInfo.educationInfo.map((data, key) => (
					<div className='row'>
						<div className='col-2'>
							<strong>
								<span style={{ fontSize: '12px' }}>
									{data.degreeFromDate}-{' '}
								</span>
								<p style={{ fontSize: '12px', marginBottom: '0px' }}>
									{data.degreeToDate}{' '}
								</p>
							</strong>
						</div>
						<div className='col-10'>
							<strong>
								<span style={{ fontSize: '12px' }}>
									{data.degreeSchoolName}
								</span>
							</strong>
							<p style={{ fontSize: '12px', marginBottom: '0px' }}>
								{data.degreeDegreeType}
							</p>
						</div>
					</div>
				))}
		</div>
	);

	const WorkHistorySection = () => (
		<div>
			<h5 style={{ marginTop: '1rem', color: '#1a36a4' }}>Work History</h5>
			<hr style={{ margin: '0px' }} />

			{workData &&
				workData.workHistoryInfo &&
				workData.workHistoryInfo.map((form, id) => (
					<div className='row'>
						<div className='col-2'>
							<strong>
								<span style={{ fontSize: '12px' }}>
									{moment(form.startDate, 'YYYY / MM / DD').year()} -
								</span>
								<p style={{ fontSize: '12px', marginBottom: '0px' }}>
									{moment(form.endDate, 'YYYY / MM / DD').year()}{' '}
								</p>
								<p style={{ fontSize: '12px', marginBottom: '0px' }}>
									Client -
								</p>
								<p style={{ fontSize: '12px', marginBottom: '0px' }}>
									Project -
								</p>
							</strong>
						</div>
						<div className='col-10'>
							<span style={{ fontSize: '12px' }}>Frontend Developer</span>

							<p style={{ fontSize: '12px', marginBottom: '0px' }}>
								{form.companyName},{form.location}
							</p>
							<strong>
								<p style={{ fontSize: '12px', marginBottom: '0px' }}>
									{form.clientName}
								</p>
							</strong>
							<strong>
								<p style={{ fontSize: '12px', marginBottom: '0px' }}>
									{form.projectName}
								</p>
							</strong>
							<p style={{ fontSize: '12px', marginBottom: '0px' }}>
								{form.description}
							</p>
							<strong>
								<p style={{ fontSize: '12px', marginBottom: '0px' }}>
									Responsibilities
								</p>
							</strong>
							<div style={{ fontSize: '12px' }}>
								<ul>
									<li>{form.task1}</li>
									<li>{form.task2}</li>
									<li>{form.task3}</li>
									<li>{form.task4}</li>
									<li>{form.task5}</li>
								</ul>
							</div>
							<strong>
								<p style={{ fontSize: '12px', marginBottom: '0px' }}>
									Technologies
								</p>
							</strong>
							<div style={{ fontSize: '12px' }}>
								<ul>
									{tech.technolgies.map((data, key) => (
										<li>{data.skill}</li>
									))}
								</ul>
							</div>
						</div>
					</div>
				))}
		</div>
	);

	const Contact = () => (
		<div className='row'>
			<h5 style={{ marginTop: '1rem', color: '#1a36a4' }}>Contact</h5>
			<hr style={{ margin: '0px' }} />
			<div style={{ width: '11rem' }}>
				<div className='row .flex-column '>
					<strong>
						<p style={{ marginBottom: '0rem', fontSize: '12px' }}>Phone</p>
					</strong>
					<p style={{ fontSize: '12px', width: '10px' }}>
						{personInfo && personInfo.contact}
					</p>
				</div>
				<div className='row '>
					<strong>
						<p style={{ marginBottom: '0rem', fontSize: '12px' }}>E-Mail</p>
					</strong>
					<p style={{ fontSize: '12px', width: '10rem' }}>
						{personInfo && personInfo.email}
					</p>
				</div>

				<div className='row .flex-column '>
					<strong>
						<p style={{ marginBottom: '0rem', fontSize: '12px' }}>Website</p>
					</strong>
					<p style={{ fontSize: '12px' }}>{personInfo && personInfo.website}</p>
				</div>
				<div className='row .flex-column'>
					<strong>
						<p style={{ marginBottom: '0rem', fontSize: '12px' }}>LinkedIn</p>
					</strong>
					<p style={{ fontSize: '12px' }}>
						{personInfo && personInfo.linkedIn}
					</p>
				</div>
				<div className='row .flex-column'>
					<strong>
						<p style={{ marginBottom: '0rem', fontSize: '12px' }}>GitHub</p>
					</strong>
					<p style={{ fontSize: '12px' }}>{personInfo && personInfo.gitHub}</p>
				</div>
			</div>
		</div>
	);

	const Certification = () => (
		<div>
			<h5 style={{ marginTop: '1rem', color: '#1a36a4' }}>Certifications</h5>
			<hr style={{ margin: '0px' }} />
			{technicalData &&
				technicalData.userCertifications &&
				technicalData.userCertifications.map((data, id) => (
					<div
						className=''
						style={{
							display: 'flex',
							justifyContent: 'space-between',
							margin: ' 10px 50px 10px 5px',
						}}>
						<strong>
							<span style={{ fontSize: '12px' }}>
								{moment(data.completedYear, 'YYYY / MM / DD').year()} -
							</span>
						</strong>

						<div className='col-10'>
							<span style={{ fontSize: '12px' }}>{data.certificateName},</span>

							<p style={{ fontSize: '12px', marginBottom: '0px' }}>
								{data.certificationPartner}
							</p>
						</div>
					</div>
				))}
		</div>
	);
	const Skills = () => (
		<div>
			<h5 style={{ marginTop: '1rem', color: '#1a36a4' }}>Skills</h5>
			<hr style={{ margin: '0px' }} />
			<div style={{ width: '11rem' }}>
				{technicalData &&
					technicalData.userExpSkills &&
					technicalData.userExpSkills.map((data, key) => (
						<div
							className=''
							style={{
								display: 'flex',
								justifyContent: 'space-between',
								margin: ' 10px 50px 10px 5px',
							}}>
							<strong>
								<p style={{ marginBottom: '0rem', fontSize: '12px' }}>
									{data.skillName}
								</p>
							</strong>

							{data.rating == 1 ? (
								<img src={circle} width='10px' height='10px' />
							) : (
								<>
									{' '}
									{data.rating == 2 && (
										<>
											<img src={circle} width='10px' height='10px' />
											<img src={circle} width='10px' height='10px' />
											<img src={circle} width='10px' height='10px' />
										</>
									)}
								</>
							)}

							<p style={{ fontSize: '12px' }}>{data.rating}</p>
						</div>
					))}
			</div>
		</div>
	);
	const Achivements = () => (
		<div style={{ marginTop: '1rem' }}>
			<h5 style={{ marginTop: '1rem', color: '#1a36a4' }}>Achivements</h5>
			<hr style={{ margin: '0px' }} />
			{technicalData &&
				technicalData.userAchivements &&
				technicalData.userAchivements.map((data, id) => (
					<ul>
						<li key={id} style={{ fontSize: '12px', marginBottom: '0px' }}>
							{data.achName}
						</li>
					</ul>
				))}
		</div>
	);
	const Tools = () => (
		<>
			<h5 style={{ marginTop: '1rem', color: '#1a36a4' }}>Tools</h5>
			<hr style={{ margin: '0px' }} />
			<div style={{ width: '11rem' }}>
				{technicalData &&
					technicalData.userCertifications &&
					technicalData.userExpTools.map((data, id) => (
						<div className='' style={{ margin: ' 10px 50px 10px 5px' }}>
							<strong>
								<p style={{ marginBottom: '0rem', fontSize: '12px' }}>
									{data.toolName}
								</p>
							</strong>
						</div>
					))}
			</div>
		</>
	);

	const Languages = () => (
		<>
			<h5 style={{ marginTop: '1rem', color: '#1a36a4' }}>Languages</h5>
			<hr style={{ margin: '0px' }} />
			<div style={{ width: '11rem' }}>
				{personInfo &&
					personInfo.languages &&
					personInfo.languages.map((data, id) => (
						<div className='' style={{ margin: ' 10px 50px 10px 5px' }}>
							<strong>
								<p style={{ marginBottom: '0rem', fontSize: '12px' }}>
									{data.language}
								</p>
							</strong>
						</div>
					))}
			</div>
		</>
	);
	const PageOne = () => (
		<div
			ref={ref}
			style={{
				width: 'auto',
				height: `${secondPage ? '803px' : 'auto'}`,

				border: '1px solid grey',

				color: `blcak`,

				boxShadow: 'rgb(71 75 255 / 10%) 0px 4px ',
			}}>
			<div
				className='row p-5'
				style={{ height: '10rem', backgroundColor: '#1a36a4' }}>
				<h1 style={{ color: 'white' }}>
					{' '}
					{personInfo && personInfo.firstname}{' '}
					{personInfo && personInfo.lastname}
				</h1>
				<h5 style={{ color: 'white' }}>{personInfo && personInfo.role}</h5>
			</div>
			<div className='row' style={{ padding: '10px' }}>
				<div className='col-9'>
					<ObjectiveSection />
					<WorkHistorySection />

					{secondPage === false && <EducationSection />}
				</div>
				<div
					className='col-3 h-100 '
					style={{
						backgroundColor: '#f4f4f4',
					}}>
					<Contact />
					<Skills />
				</div>
			</div>
		</div>
	);

	const PageTwo = () => (
		<div
			ref={ref}
			style={{
				width: 'auto',
				height: 'auto',

				border: '1px solid grey',

				color: `blcak`,

				boxShadow: 'rgb(71 75 255 / 10%) 0px 4px ',
			}}>
			<div className='row p-3'>
				<div className='col-9'>
					{pageHeight !== 803 && <EducationSection />}
					<Certification />
					<Achivements />
				</div>
				<div
					className='col-3 h-100 '
					style={{
						backgroundColor: '#f4f4f4',
					}}>
					<Tools />
					<Languages />
				</div>
			</div>
		</div>
	);

	useEffect(() => {
		if (pageHeight > 400) {
			setSecondPage(true);
		}
	}, [pageHeight]);
	return (
		<>
			<PageOne />
			{secondPage == true && <PageTwo />}

			<Pdf targetRef={ref} filename='post.pdf'>
				{({ toPdf }) => <button onClick={toPdf}>Capture as PDF</button>}
			</Pdf>
		</>
	);
};

export default Preview;
