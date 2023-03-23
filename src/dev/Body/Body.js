import React, { useEffect, useState } from 'react';
import { Accordian, DragSlider, Input, Select, Slideshow, useOverlayContext } from 'lib';
import { AccHeader, ExampleSlide } from '..';
import './Body.scss';
import './sanitize.css';
import 'sanitize.css/forms.css';

export default function Body({ style, ...rest }) {
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
	const [modalDone, modalDoneSet] = useState(true);
	const onChange = ({ target }) => {
		console.log(target.name, target.value);
		setSt({ ...apSt, [target.name]: target.value})
	};
	const opacityChange = ({ target }) => { console.log(target); setSt({ ...apSt, opacity: target.value}); };
	const things = ['Apple','Banana','carrot'];
	const slides = things.map((thing, i) => ({ body: ExampleSlide, value: thing }));
	const watchAcc = (oState) => console.log(oState);
	const onClosed = (oState) => console.log('closed');
	const onOpened = (oState) => console.log('opened');
	const { modals } = useOverlayContext();
	const openGuy = (guy = 'hotdog') => ({ target }) => modals.open(guy,{ fixed: true, target });

	const options = [{
		value: 'pizza',
		label: 'Pizza'
	},{
		value: 'sandwich',
		label: 'ToastedSandwich'
	},{
		value: 'hotdog',
		label: 'Hotdog'
	}];

	useEffect(() => {
		if (!modalDone) {
			//console.log('🐤', modalDone);
			modals.open('smile',{
				closeOutside: true,
				tint: true,
				// debug: true, 
				parent: { x: window.innerWidth + 80, y: window.innerHeight + 80 }
			});
			modalDoneSet(true);
		}
	},[modals, modalDone]);

	return  <div {...{ className: 'body-frame', style }}>
		<div {...{ className: 'demo-block'}}>
			<button onClick={openGuy('hotdog')}>Open it</button>
			<button onClick={openGuy('hotdog')}>Open it</button>
			<button onClick={openGuy('hotdog')}>Open it</button>
			<button onClick={openGuy('hotdog')}>Open it</button>
			<button onClick={openGuy('hotdog')}>Open it</button>
			<button onClick={openGuy('hotdog')}>Open it</button>
			<button onClick={openGuy('hotdog')}>Open it</button>
			<button onClick={openGuy('hotdog')}>Open it</button>
			<button onClick={openGuy('hotdog')}>Open it</button>
			<button onClick={openGuy('hotdog')}>Open it</button>
			<button onClick={openGuy('hotdog')}>Open it</button>
			<button onClick={openGuy('hotdog')}>Open it</button>
			<button onClick={openGuy('hotdog')}>Open it</button>
			<button onClick={openGuy('hotdog')}>Open it</button>
			<button onClick={openGuy('hotdog')}>Open it</button>
			<button onClick={openGuy('hotdog')}>Open it</button>
			<button onClick={openGuy('hotdog')}>Open it</button>
			<button onClick={openGuy('hotdog')}>Open it</button>
			<button onClick={openGuy('hotdog')}>Open it</button>
			<button onClick={openGuy('hotdog')}>Open it</button>
			<button onClick={openGuy('hotdog')}>Open it</button>
			<button onClick={openGuy('hotdog')}>Open it</button>
			<button onClick={openGuy('hotdog')}>Open it</button>
			<button onClick={openGuy('hotdog')}>Open it</button>
			<button onClick={openGuy('hotdog')}>Open it</button>
		</div>
		<h3>Select</h3>
		<div {...{ className: 'demo-block demo-grid'}}>
			<Select {...{ fixed: true, value: apSt.food, onChange, name: 'food', label: 'Food', options, }} />
			<Select {...{ value: apSt.food, onChange, name: 'food', label: 'Food', options, }} />
			<Select {...{ value: apSt.food, onChange, name: 'food', label: 'Food', options, }} />
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
		<h3>Select</h3>
		<div {...{ className: 'demo-block demo-grid'}}>
			<Select {...{ fixed: true, value: apSt.food, onChange, name: 'food', label: 'Food', options, }} />
			<Select {...{ value: apSt.food, onChange, name: 'food', label: 'Food', options, }} />
			<Select {...{ value: apSt.food, onChange, name: 'food', label: 'Food', options, }} />
		</div>
	</div>;
};