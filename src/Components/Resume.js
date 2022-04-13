import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import tech from '../JSON-Data/tech.json';
import { getResumeDetails } from '../redux/actions/personDetails';
import circle from '../image/circle-solid.svg';
import Pdf from 'react-to-pdf';
import {
	Document,
	Page,
	Text,
	View,
	StyleSheet,
	PDFViewer,
} from '@react-pdf/renderer';
const Resume = () => {
	const personDetails = useSelector((state) => state.personDetails);
	const educationDetails = useSelector((state) => state.educationDetails);
	const workDetails = useSelector((state) => state.workDetails);
	const technicalDetails = useSelector((state) => state.technicalDetails);
	const userAuth = useSelector((state) => state.userAuth);
	const [pageHeight, setPageHeight] = useState();
	const [pageWidth, setPageWidth] = useState();
	const [secondPage, setSecondPage] = useState(false);
	const dispatch = useDispatch();
	var previewHg = pageHeight;
	const { personInfo } = personDetails;
	const { workData } = workDetails;

	const { studyInfo } = educationDetails;

	const { technicalData } = technicalDetails;
	const ref = useRef();

	const handleDimension = () => {
		setPageHeight(ref.current.clientHeight);
		setPageWidth(ref.current.clientWidth);
	};

	const headSection = () => (
		<div
			className='row p-5'
			style={{ height: '10rem', backgroundColor: '#1a36a4' }}>
			<h1 style={{ color: 'white' }}>
				{personInfo && personInfo.firstname} {personInfo && personInfo.lastname}
			</h1>
			<h5 style={{ color: 'white' }}>{personInfo && personInfo.role}</h5>
		</div>
	);

	const ObjectiveSection = () => (
		<p style={{ fontSize: '12px', marginTop: '20px' }}>
			{personInfo && personInfo.careerObjective}
		</p>
	);
	const WorkHistorySection = () => (
		<div>
			<h5 style={{ marginTop: '0.5rem', color: '#1a36a4' }}>Work History</h5>
			<hr style={{ margin: '0px' }} />

			{workData &&
				workData.workHistoryInfo &&
				workData.workHistoryInfo.map((form, id) => (
					<div className='row '>
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
	const Contact = () => (
		<div style={{ width: 'auto', display: 'flex', flexDirection: 'column' }}>
			<h5 style={{ marginTop: '1rem', color: '#1a36a4' }}>Contact</h5>
			<hr style={{ margin: '0px' }} />
			<div style={{ width: '11rem' }}>
				<div>
					<strong>
						<p style={{ marginBottom: '0rem', fontSize: '12px' }}>Phone</p>
					</strong>
					<p style={{ fontSize: '12px', width: '10px' }}>
						{personInfo && personInfo.contact}
					</p>
				</div>
				<div>
					<p style={{ marginBottom: '0rem', fontSize: '12px' }}>E-Mail</p>

					<p style={{ fontSize: '12px', width: '10rem' }}>
						{personInfo && personInfo.email}
					</p>
				</div>

				<div className='row  '>
					<strong>
						<p style={{ marginBottom: '0rem', fontSize: '12px' }}>Website</p>
					</strong>
					<p style={{ fontSize: '12px' }}>{personInfo && personInfo.website}</p>
				</div>
				<div>
					<strong>
						<p style={{ marginBottom: '0rem', fontSize: '12px' }}>LinkedIn</p>
					</strong>
					<p style={{ fontSize: '12px' }}>
						{personInfo && personInfo.linkedIn}
					</p>
				</div>
				<div>
					<strong>
						<p style={{ marginBottom: '0rem', fontSize: '12px' }}>GitHub</p>
					</strong>
					<p style={{ fontSize: '12px' }}>{personInfo && personInfo.gitHub}</p>
				</div>
			</div>
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

	const options = {
		orientation: ' portrait ',
		unit: 'px',
		format: [pageWidth, pageHeight],
	};

	console.log(pageHeight, pageWidth);

	return (
		<>
			<div
				className='container mt-5'
				style={{ border: '1px solid grey', height: 'auto' }}
				ref={ref}>
				{headSection()}
				<div className='p-1' style={{ width: '100%', display: 'flex' }}>
					<div
						className=''
						style={{
							display: 'flex',
							flexDirection: 'column',
							width: '70%',
						}}>
						{ObjectiveSection()}
						{WorkHistorySection()}
						{EducationSection()}
						{Certification()}
						{Achivements()}
					</div>
					<div
						className=''
						style={{
							display: 'flex',
							flexDirection: 'column',
							width: '30%',
							backgroundColor: '#f4f4f4',
							padding: '5px 8px',
						}}>
						{Contact()}
						{Skills()}

						{Tools()}
						{Languages()}
					</div>
				</div>
			</div>

			<div style={{ marginTop: '10px' }}>
				<Pdf targetRef={ref} filename='post.pdf' options={options}>
					{({ toPdf }) => <button onClick={toPdf}>Capture as PDF</button>}
				</Pdf>
			</div>
		</>
	);
};

export default Resume;
