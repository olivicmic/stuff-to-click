import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Accordian, configPopouts, DragSlider, Input, OverLayer, Picker, Select, Slideshow, useOverlayContext, useOverlays } from './lib';
import { AccHeader, ExampleSlide } from './dev';
import './index.scss';
import './sanitize.css';
import 'sanitize.css/forms.css';

const Smile = ({ style, ...rest }) => {
	return <div {...{ className: 'smile', style }} >:)</div>;
};

const Body = ({ modalActive, ...rest }) => {
	const [apSt, setSt] = useState({
		text: '',
		password: '',
		email: '',
		phonenumber: '',
		extraTxt: '',
		color: '9acd33',
		opacity: 75,
		num: '',
		food: ''
	});
	const onChange = (e) => {console.log(e.target.name); setSt({ ...apSt, [e.target.name]: e.target.value})};
	const opacityChange = ({ target }) => { console.log(target); setSt({ ...apSt, opacity: target.value}); };
	const things = ['Apple','Banana','carrot'];
	const slides = things.map((thing, i) => ({ body: ExampleSlide, value: thing }));
	const watchAcc = (oState) => console.log(oState);
	const onClosed = (oState) => console.log('closed');
	const onOpened = (oState) => console.log('opened');
	const { modals } = useOverlayContext();
	const openSmile = ({ target }) => modals.open('smile',{ target });

	const selItems = [{
		value: 'pizza',
		label: 'Pizza'
	},{
		value: 'sandwich',
		label: 'ToastedSandwich'
	},{
		value: 'hotdog',
		label: 'Hotdog'
	}];
	return  <div {...{ style: { ...modalActive && { position: 'fixed' } } }}>
		<h1>Stuff to Click</h1>
		<div {...{ className: 'demo-block'}}>
			<h3>Modals</h3>
			<button onClick={openSmile}>Open it</button>
		</div>
		<div {...{ className: 'demo-block'}}>
			<h3>Select</h3>
			<Select {...{ value: apSt.food, onChange, name: 'food', label: 'Food', set: selItems }} />
		</div>
		<div {...{ className: 'demo-block'}}>
			<h3>Input</h3>
			<Input {...{ name: 'text', onChange, label: 'Some text', value: apSt.text, type: 'text' }}/>
		</div>
		<div {...{ className: 'demo-block'}}>
			<h3>Accordians</h3>
			<Accordian {...{ className: 'sticky', header: AccHeader, opened: true, onChange: watchAcc, onClosed, onOpened }} >
				<h3>Hey</h3>
				<p>Some stuff</p>
				<Accordian {...{ className: 'sticky', header: AccHeader, onChange: watchAcc, onClosed, onOpened }} >
					<p>Accordians can contain accordians!</p>
				</Accordian>
			</Accordian>
		</div>
		<div {...{ className: 'demo-block'}}>
			<h3>Slideshow</h3>
			<Slideshow {...{ from: {opacity: 1, range: 100}, leave: {opacity: 0, range: 50}, slides }} />
		</div>
		<div {...{ className: 'demo-block'}}>
			<h3>DragSlider</h3>
			<DragSlider {...{ value: apSt.opacity, max: 100, onChange: opacityChange, trackStyle: {backgroundColor: `rgba(100,100,100, ${ apSt.opacity / 100})`} }}/>
		</div>
	</div>;
};

const App = () => {
	const layerState = { 
		modals: useOverlays({ smile: { child: { closeOutside: true } }}),
		popout: useOverlays(configPopouts)
	};
	const layers = [
		{ overLayerName: 'modals', type: Smile },
		{ overLayerName: 'popout', type: Picker }
	];
	return <OverLayer {...{ layers, layerState, render: Body }}/>;
};

createRoot( document.getElementById('root')).render(<App />);
