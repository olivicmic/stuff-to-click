import React from 'react';
import { InputWrap } from '..';
import { useInput } from 'hangers';

const Input = ({ events, extra: Extra, extraAttr, focus, type = 'text', valueName, ...rest}) => 
	<div className='stuff-input-content'>
		<input { ...{ ...rest, ...events, type } }/>
		{ Extra ? <Extra {...extraAttr} className='stuff-input-extra'/> : null }
	</div>;

export default function SlideInput({ onBlur, onFocus, ...rest }) {
	const { events, focus } = useInput({ onBlur, onFocus });
	return <InputWrap { ...{ ...rest, events, focus, component: Input } } />;
};