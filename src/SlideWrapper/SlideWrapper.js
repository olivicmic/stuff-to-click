import React, {useEffect, useRef, useState} from "react";
import DropDown  from '../DropDown';
import useDropDown from './useDropDown';
import useInput from './useInput';
import FauxOption  from '../DropDown/FauxOption';
import './SlideWrapper.scss';

const SlideWrapper = ({ component: Component, bar, dropdown, id, label, list, listStyle, name, onChange = () => {}, onClick = () => {}, required, set = [], style, valid, value, debug, ...rest}) => {
	const { focus, focusOff, labelClass, mainClass, setFocus, setValueName, local, setLocal, ...inpProps } = useInput({ valid, value });
	const submit = y => {
		console.log('AGH 😩', focus, document.activeElement);
		setLocal(set[y].value);
		onChange({ target: {...set[y], name }});
		console.log('ACH 😩', focus, document.activeElement);
		setValueName(set[y].label);
		console.log('ERR 😩', focus, document.activeElement);
	};

	/*useEffect(() => {
		if (local) onChange({ target: {value: local}, name })
	},[local]);*/
	const { close, hostRef, index, open, ...dropProps } = useDropDown({ count: set.length, debug, focus, focusOff, pre: set.indexOf(local), setFocus, setValueName, submit });
	const sharedAttr = { set, name, focus, onChange, value: local };
	const click = () => { open(); onClick(); };
	const items = list ? list({ close, index, value: local, submit }) : null;

	return <React.Fragment>
		<div className={mainClass} style={style} ref={hostRef} key='ashole'>
			<label htmlFor={id} className={labelClass} name={name + ' label'}>
				{label}
				{required ? <div className="stuff-slide-input-required"></div> : null}
			</label>
			<Component key='fuck' { ...{ ...rest, ...sharedAttr, ...inpProps, id, required, onClick: click }} />
			{ bar ? <div className='stuff-slide-bar' style={bar}></div> : null }
		</div>
		{ dropdown && set ? <DropDown { ...{...sharedAttr, ...dropProps, debug, hostRef, items, listStyle }} key='shit' /> : null }
	</React.Fragment>;
};

export default SlideWrapper;