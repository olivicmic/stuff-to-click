import React from "react";
import SlideWrapper  from '../SlideWrapper';
import useInput from '../resources/useInput';

const Input = ({ events, extra: Extra, extraAttr, focus, type = 'text', valueName, ...rest}) => 
	<div className='stuff-slide-input-content'>
		<input { ...{ ...rest, ...events, type } }/>
		{ Extra ? <Extra {...extraAttr} className='stuff-slide-input-extra'/> : null }
	</div>;

export default function SlideInput({ ...rest }) {
	const { events, focus } = useInput({});
	return <SlideWrapper { ...{ ...rest, events, focus, component: Input } } />;
};