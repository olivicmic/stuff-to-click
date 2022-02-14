import React, { useEffect, useRef, useState } from "react";
import DropDown  from '../DropDown';
import useRefWithCallback from './useRefWithCallback';
import useInput from './useInput';
import './SlideWrapper.scss';

const SlideWrapper = ({ component, bar, dropdown, id, label, list, listStyle, name, onChange = () => {}, onClick = () => {}, required, set = [], style, valid, value, debug, ...rest}) => {
	const [active, setActive] = useState(false); // move me to useInput and inProps. Makes sense!
	const [host, hostRef] = useRefWithCallback();
	const [kid, kidRef] = useRefWithCallback();
	const { inProps, labelClass, mainClass, ...inEvent } = useInput({ valid, value });
	const sharedAttr = { debug, id, set, name, onChange, value };
	const focusChild = () => kidRef.current && kidRef.current.focus();

	return <React.Fragment>
		<div { ...{ className: mainClass, style, ref: hostRef, key: id, id, onFocus: focusChild}}>
			<label htmlFor={id} className={labelClass} name={name + ' label'}>
				{ label }
				{required ? <div className="stuff-slide-input-required"></div> : null}
			</label>
			{component({ ...inEvent, ...rest, ...sharedAttr, onClick: () => setActive(true), ...( dropdown ? {ref: kidRef} : {}), required })}
			{ bar ? <div className='stuff-slide-bar' style={bar}></div> : null }
		</div>
		{ dropdown && host && set ? <DropDown { ...{...sharedAttr, ...inProps, focusChild, active, dropdown, host, hostRef, listStyle, options: list, setActive  }} /> : null }
	</React.Fragment>;
};

export default SlideWrapper;