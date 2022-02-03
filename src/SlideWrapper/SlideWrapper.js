import React, {useEffect, useRef, useState} from "react";
import DropDown  from '../DropDown';
import useDropDown from './useDropDown';
import useInput from './useInput';
import './SlideWrapper.scss';

const SlideWrapper = ({ component: Component, bar, dropdown, id, label, listStyle, name, onChange = () => {}, onClick = () => {}, required, set = [], style, valid, value, debug, ...rest}) => {
	const submit = y => {
		onChange({ target: {...set[y], name }});
		setValueName(set[y].label);
	};
	const { focus, labelClass, mainClass, setValueName, ...inpProps } = useInput({ valid, value });
	const { hostRef, open, ...dropProps } = useDropDown({ count: set.length, debug, focus, pre: set.indexOf(value), setValueName, submit });
	const sharedAttr = { set, name, focus, onChange, value };
	const click = () => { open(); onClick(); };

	return(
		<React.Fragment>
		<div className={mainClass} style={style} ref={hostRef}>
			<label htmlFor={id} className={labelClass} name={name + ' label'}>
				{label}
				{required ? <div className="stuff-slide-input-required"></div> : null}
			</label>
			<Component { ...{ ...rest, ...sharedAttr, ...inpProps, id, required, onClick: click }} />
			{ bar ? <div className='stuff-slide-bar' style={bar}></div> : null }
		</div>
		{ dropdown && set ? <DropDown { ...{...sharedAttr, ...dropProps, debug, listStyle, setValueName }} /> : null }
		</React.Fragment>
	);
};

export default SlideWrapper;