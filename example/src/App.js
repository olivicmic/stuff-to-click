import React, { useState } from 'react';

import { SlideInput } from 'stuff-to-click';
import 'stuff-to-click/dist/index.css'

const App = () => {
	const [apSt, setSt] = useState({
		text: '',
		password: '',
		email: '',
		tel: ''
	});
	const onChange = (e) => {
		console.log(typeof e.target.type);
		setSt({ ...apSt, [e.target.type]: e.target.value});
	};

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
			</ul>			
			<SlideInput type="text" value={apSt.text} onChange={onChange} name='Some text' style={testStyle}/>
			<SlideInput type="password" value={apSt.password} onChange={onChange} name='A password' required bar={{}}/>
			<SlideInput type="email" value={apSt.email} onChange={onChange} name='An email' required bar={{}} style={{ fontSize: '1.5rem' }}/>
			<SlideInput type="tel" value={apSt.tel} onChange={onChange} name='A phone number' required bar={{backgroundColor: 'blue'}} style={{ fontSize: '1.75rem', display: 'block' }} valid={false}/>
		</div>
	);
}

export default App
