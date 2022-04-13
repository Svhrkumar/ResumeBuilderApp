import React, { useState, useRef } from 'react';
import SubNav from '../Components/contentMaker/SubNav';
import marked from 'marked';
import {
	exportComponentAsJPEG,
	exportComponentAsPDF,
} from 'react-component-export-image';

const ContentMaker = () => {
	const [text, setText] = useState('');
	const [fonts, setFonts] = useState();
	const [color, setColor] = useState();
	const [bgColor, setBgColor] = useState();
	const [enter, setEnter] = useState(false);
	const mainContainer = {
		border: '2px solid,grey',
		maxWidth: '100%',
		height: 'auto',
		padding: '10px 15px',
	};
	const componentRef = useRef();
	const handleCustomize = (fontStyle, textColor, bColor) => {
		setFonts(fontStyle);
		setColor(textColor);
		setBgColor(bColor);
	};

	const handleText = (e) => {
		setText(e);
	};

	const html2CanvasOptions = {
		w: 100,
		h: 0,
		x: 0,
		y: 0,
		unit: 'px',
	};
	return (
		<div>
			<SubNav handleCustomize={handleCustomize} />
			<div style={mainContainer}>
				<h2 style={{ margin: '10px 12rem' }}>Text to Handwriting converter</h2>
				<div
					style={{
						display: 'grid',
						placeItems: 'center',
						padding: '10px 30px',
					}}>
					<textarea
						rows='20'
						cols='150'
						value={text}
						onChange={(e) => handleText(e.target.value)}
						placeholder='Describe yourself here...'
						style={{
							maxWidth: '100%',
							padding: '10px',
						}}></textarea>

					<div style={{ margin: '20px 30px' }}>
						<div
							ref={componentRef}
							style={{
								width: '640px',
								height: '754px',
								backgroundColor: `${bgColor}`,
								border: '1px solid grey',
								padding: '20px 15px',
								color: `${color}`,
								fontFamily: `${fonts}`,
								boxShadow: 'rgb(71 75 255 / 10%) 0px 4px ',
							}}
							dangerouslySetInnerHTML={{ __html: marked(text) }}></div>
					</div>

					<button
						style={{
							borderRadius: '5px',
							backgroundColor: '#03203C',
							padding: '5px 8px',
							color: '#ffffff',
							margin: '5px 10px',
						}}
						onClick={() =>
							exportComponentAsJPEG(componentRef, html2CanvasOptions)
						}>
						Export As JPEG
					</button>
					<button
						style={{
							borderRadius: '5px',
							backgroundColor: '#03203C',
							padding: '5px 8px',
							color: '#ffffff',
							margin: '5px 10px',
						}}
						onClick={() => exportComponentAsPDF(componentRef)}>
						Export As pdf
					</button>
				</div>
			</div>
		</div>
	);
};

export default ContentMaker;
