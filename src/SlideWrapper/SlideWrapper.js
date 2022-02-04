import React, {useEffect, useRef, useState} from "react";
import DropDown  from '../DropDown';
import useDropDown from './useDropDown';
import useInput from './useInput';
import FauxOption  from '../DropDown/FauxOption';
import './SlideWrapper.scss';

const SlideWrapper = ({ component: Component, bar, dropdown, id, label, list, listStyle, name, onChange = () => {}, onClick = () => {}, required, set = [], style, valid, value, debug, ...rest}) => {
	const { focus, labelClass, mainClass, setValueName, ...inpProps } = useInput({ valid, value });
	const submit = y => {
		onChange({ target: {...set[y], name }});
		setValueName(set[y].label);
	};
	const { hostRef, index, open, ...dropProps } = useDropDown({ count: set.length, debug, focus, pre: set.indexOf(value), setValueName, submit });
	const sharedAttr = { set, name, focus, onChange, value };
	const click = () => { open(); onClick(); };
	const items = list ? list({ index, value, submit }) : null;

	return <React.Fragment>
		<div className={mainClass} style={style} ref={hostRef}>
			<label htmlFor={id} className={labelClass} name={name + ' label'}>
				{label}
				{required ? <div className="stuff-slide-input-required"></div> : null}
			</label>
			<Component { ...{ ...rest, ...sharedAttr, ...inpProps, id, required, onClick: click }} />
			{ bar ? <div className='stuff-slide-bar' style={bar}></div> : null }
		</div>
		{ dropdown && set ? <DropDown { ...{...sharedAttr, ...dropProps, debug, hostRef, items, listStyle }} /> : null }
	</React.Fragment>;
};

export default SlideWrapper;