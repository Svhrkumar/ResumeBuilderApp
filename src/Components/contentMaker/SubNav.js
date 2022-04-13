import React, { useState, useEffect } from 'react';
import fontsData from '../../JSON-Data/fontsList.json';
import colorData from '../../JSON-Data/colorList.json';
const SubNav = ({ handleCustomize }) => {
	const [fonts, setFonts] = useState();
	const [color, setColor] = useState();
	const [bgColor, setBgColor] = useState();
	const navContainer = {
		display: 'flex',
		justifyContent: 'space-between',
		maxWidth: '100%',
		height: 'auto',
		margin: '20px 20px',
		padding: '20px 10px ',
		backgroundColor: '#CAD5E2',
		borderRadius: '9px',
		flexWrap: 'wrap',
	};
	const label = {
		color: 'Black',
		fontWeight: '500',
		fontSize: '15px',
		margin: '5px 10px',
		padding: '5px 10px',
	};
	const inputBack = {
		backgroundColor: `${color}`,
	};
	const inputStyle = {
		width: '15rem',
		height: '2rem',
		padding: '5px 10px ',
		borderRadius: '5px',
	};
	console.log('fonts', fontsData, fonts);
	useEffect(() => {
		handleCustomize(fonts, color, bgColor);
	}, [fonts, color, bgColor]);

	return (
		<div style={navContainer}>
			<div>
				<label style={label}> Fonts :</label>
				<select
					style={inputStyle}
					name='fontList'
					value={fonts}
					onChange={(e) => setFonts(e.target.value)}>
					{fontsData.fontsList.map((list, key) => (
						<option
							key={key}
							value={`${list.name}`}
							style={{ fontFamily: `${list.name}` }}>
							{list.name}
						</option>
					))}
					 
				</select>
			</div>
			<div>
				<label style={label}> colors :</label>
				<select
					style={(inputStyle, inputBack)}
					name='fontList'
					value={color}
					onChange={(e) => setColor(e.target.value)}>
					{colorData.colorList.map((list, key) => (
						<option
							key={key}
							value={`${list.color}`}
							style={{ backgroundColor: `${list.color}` }}>
							{list.color}
						</option>
					))}
					 
				</select>
			</div>
			<div>
				<label style={label}> backgroundColor :</label>
				<select
					style={inputStyle}
					name='fontList'
					value={bgColor}
					onChange={(e) => setBgColor(e.target.value)}>
					{colorData.colorList.map((list, key) => (
						<option
							key={key}
							value={`${list.color}`}
							style={{ backgroundColor: `${list.color}` }}>
							{list.color}
						</option>
					))}
					   
				</select>
			</div>
		</div>
	);
};

export default SubNav;
