import React, { useEffect, useRef, useState } from "react";
import DropDown  from '../DropDown';
//import useDropDown from './useDropDown';
import useInput from './useInput';
import './SlideWrapper.scss';

const SlideWrapper = ({ component, bar, dropdown, id, label, list, listStyle, name, onChange = () => {}, onClick = () => {}, required, set = [], style, valid, value, debug, ...rest}) => {
	const [active, setActive] = useState(false);
	const [host, setHost] = useState();
	const [kid, setKid] = useState();
	const hostRef = useRef(null);
	const kidRef = useRef(null);
	const { inProps, labelClass, mainClass, ...inEvent } = useInput({ valid, value });
	const sharedAttr = { debug, id, set, name, onChange, value };
	const focusChild = () => kidRef.current && kidRef.current.focus();

	useEffect(() => {
 		if ( hostRef && !host) setHost(hostRef.current);
 	}, [hostRef, host]);

	useEffect(() => {
		if ( kidRef && !kid) setKid(kidRef.current);
	}, [kidRef, kid]);

	return <React.Fragment>
		<div { ...{ className: mainClass, style, ref: hostRef, key: id, id, onFocus: focusChild}}>
			<label htmlFor={id} className={labelClass} name={name + ' label'}>
				{ label }
				{required ? <div className="stuff-slide-input-required"></div> : null}
			</label>
			{component({ ...inEvent, ...rest, ...sharedAttr, onClick: () => setActive(true), kidref: kidRef, required })}
			{ bar ? <div className='stuff-slide-bar' style={bar}></div> : null }
		</div>
		{ dropdown && host && set ? <DropDown { ...{...sharedAttr, ...inProps, focusChild, active, dropdown, host, hostRef, listStyle, options: list, setActive  }} /> : null }
	</React.Fragment>;
};

export default SlideWrapper;