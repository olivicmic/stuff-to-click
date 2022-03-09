import React, { useEffect, useState } from "react";
import DropDown  from '../DropDown';
import { useStateRef } from 'hangers';
import useStuffClasses from './useStuffClasses';
import useInput from './useInput';
import './SlideWrapper.scss';

const SlideWrapper = ({ component, bar, dropdown, id, label, list, listStyle, name, onChange = () => {}, onClick = () => {}, required, set = [], style, valid, value, debug, active, focus, valueName, index, selState, expanded, setActive, setFocus, setValueName, events, sprung, enter, exit, close, ...rest}) => {
	//const { active, focus, valueName } = inputProps;
	const [host, ref] = useStateRef();
	const [kid, kidRef] = useStateRef();
	//const [ { active, focus, valueName }, controls, events ] = useInput({ valid, value });
	const { labelClass, mainClass } = useStuffClasses({ focus, valid, value });
	const shared = { debug, id, set, name, onChange, value };
	const onFocus = () => kid?.focus() || {};

	return <React.Fragment>
		<div { ...{ className: mainClass, key: id, id, onFocus, ref, style, }}>
			<label htmlFor={id} className={labelClass} name={name + ' label'}>
				{ label }
				{required ? <div className="stuff-slide-input-required"></div> : null}
			</label>
			{component({ ...events, ...rest, ...shared, ...( dropdown ? {kidRef} : {}), required, valueName })}
			{ bar ? <div className='stuff-slide-bar' style={bar}></div> : null }
		</div>
		{ dropdown && host && set ? <DropDown { ...{...shared, index, selState, expanded, setActive, setFocus, setValueName, active, dropdown, focus, host, listStyle, onFocus, options: list, sprung, enter, exit, close }} /> : null }
	</React.Fragment>;
};

export default SlideWrapper;