import React, {useEffect, useRef, useState} from "react";
import DropDown  from '../DropDown';
import useDropDown from './useDropDown';
import useInput from './useInput';
import FauxOption  from '../DropDown/FauxOption';
import './SlideWrapper.scss';

const SlideWrapper = ({ component: Component, bar, dropdown, id, label, list, listStyle, name, onChange = () => {}, onClick = () => {}, required, set = [], style, valid, value, debug, ...rest}) => {
	const { inProps, labelClass, mainClass, ...inpProps } = useInput({ valid, value });
	const { hostRef, open, ...dropProps } = useDropDown({ ...inProps, debug, options: list, name, onChange, set, value });
	const sharedAttr = { set, name, onChange, value };
	const click = () => { open(); onClick(); };

	return <React.Fragment>
		<div className={mainClass} style={style} ref={hostRef}>
			<label htmlFor={id} className={labelClass} name={name + ' label'}>
				{label}
				{required ? <div className="stuff-slide-input-required"></div> : null}
			</label>
			<Component key='fuck' { ...{ ...rest, ...sharedAttr, ...inpProps, id, required, onClick: click }} />
			{ bar ? <div className='stuff-slide-bar' style={bar}></div> : null }
		</div>
		{ dropdown && set ? <DropDown { ...{...sharedAttr, ...dropProps, debug, hostRef, listStyle }} key='shit' /> : null }
	</React.Fragment>;
};

export default SlideWrapper;