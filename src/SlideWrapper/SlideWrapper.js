import React, { useEffect, useState } from "react";
import DropDown  from '../DropDown';
import { useStateRef } from 'hangers';
import useStuffClasses from './useStuffClasses';
import useInput from './useInput';
import './SlideWrapper.scss';

const SlideWrapper = ({ component, bar, dropdown, id, label, listStyle, name, required, set = [], style, valid, value, debug, focus, valueName, selState, events, sprung, enter, kidRef, onFocus, items, ...rest}) => {
	const [host, ref] = useStateRef();
	const { labelClass, mainClass } = useStuffClasses({ focus, valid, value });
	const shared = { debug, id, value };

	return <React.Fragment>
		<div { ...{ className: mainClass, key: id, id, onFocus, ref, style, }}>
			<label htmlFor={id} className={labelClass} name={name + ' label'}>
				{ label }
				{required ? <div className="stuff-slide-input-required"></div> : null}
			</label>
			{component({ ...events, ...rest, ...shared, ...( dropdown ? {kidRef} : {}), name, required, set, valueName })}
			{ bar ? <div className='stuff-slide-bar' style={bar}></div> : null }
		</div>
		{ dropdown && host && set ? <DropDown { ...{...shared, selState, dropdown, host, listStyle, sprung, enter, items }} /> : null }
	</React.Fragment>;
};

export default SlideWrapper;