import React from "react";
import DropDown  from '../DropDown';
import { useStateRef } from 'hangers';
import useStuffClasses from './useStuffClasses';
import useInput from './useInput';
import './SlideWrapper.scss';

const SlideWrapper = ({ bar, component, events, focus, debug, dropdown, id, items, kidRef, label, listStyle, name, onFocus, setHost, required, selState, set = [], style, valid, value, valueName, host, ...rest }) => {
	const { labelClass, mainClass } = useStuffClasses({ focus, valid, value });
	const shared = { debug, id, value };

	return <React.Fragment>
		<div { ...{ className: mainClass, key: id, id, onFocus, style, ref: setHost }}>
			<label htmlFor={id} className={labelClass} name={name + ' label'}>
				{ label }
				{required ? <div className="stuff-slide-input-required"></div> : null}
			</label>
			{component({ ...rest, ...shared, ...( dropdown ? {kidRef} : {}), events, name, required, valueName })}
			{ bar ? <div className='stuff-slide-bar' style={bar}></div> : null }
		</div>
		{ dropdown && host && set ? <DropDown { ...{...shared, selState, dropdown, host, listStyle, items }} /> : null }
	</React.Fragment>;
};

export default SlideWrapper;