import React, { useState } from 'react';

import { DragSlider, SlideInput } from 'stuff-to-click';

import 'stuff-to-click/dist/index.css'

const App = () => {
	const [apSt, setSt] = useState({
		text: '',
		password: '',
		email: '',
		phonenumber: '',
		extraTxt: '',
		color: '9acd33'
	});
	const onChange = (e) => setSt({ ...apSt, [e.target.name]: e.target.value});
	const colorChange = (color) => setSt({ ...apSt, color: color});

	const testStyle = {
		color: 'blue',
		backgroundColor: 'green',
		fontSize: '2rem',
		width: '800px'
	};

	return (
		<div>
			<h1>Click These Things!</h1>
			<ul>
				<li>Text input: {apSt.text}</li>
				<li>Password input: {apSt.password}</li>
				<li>Email input: {apSt.email}</li>
				<li>Telephone input: {apSt.tel}</li>
				<li>Color: {apSt.color}</li>
			</ul>			
			<SlideInput type="text" value={apSt.text} onChange={onChange} name='text' style={testStyle} id="howdy" label='Some text'/>
			<SlideInput type="password" value={apSt.password} onChange={onChange} name='password' required bar={{}} label='A Password'/>
			<SlideInput type="tel" value={apSt.tel} onChange={onChange} name='phonenumber' required bar={{backgroundColor: 'blue'}} style={{ fontSize: '1.75rem', display: 'block' }} valid={false}/>
			<SlideInput type="email" value={apSt.email} onChange={onChange} name='email' required bar={{}} style={{ fontSize: '1.5rem' }} autoComplete="false" label="An Email"/>
			<div style={{margin: '30px'}} label="A Phone Number">
				<SlideInput type="text" value={apSt.extraTxt} onChange={onChange} name='extraTxt' required bar={{}} style={{ fontSize: '1.5rem' }} autoComplete="false" label="Some Text"/>
			</div>
			<div>
				<h3>Drag Slider</h3>
				<DragSlider color={apSt.color} onChange={colorChange}/>
				<DragSlider color={apSt.color} onChange={colorChange} channel='1'/>
				<DragSlider color={apSt.color} onChange={colorChange} channel='2'/>
			</div>
		</div>
	);
}

export default App
