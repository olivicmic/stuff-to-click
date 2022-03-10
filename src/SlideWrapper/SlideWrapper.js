import React from "react";
import useStuffClasses from './useStuffClasses';
import './SlideWrapper.scss';

const SlideWrapper = ({ bar, component, events, focus, debug, dropdown, id, inputRef, label, name, onFocus, setHost, required, set = [], style, valid, value, valueName, ...rest }) => {
	const { labelClass, mainClass } = useStuffClasses({ focus, valid, value });
	return <React.Fragment>
		<div { ...{ className: mainClass, id, onFocus, style, ref: setHost }}>
			<label htmlFor={id} className={labelClass} name={name + ' label'}>
				{ label }
				{required ? <div className="stuff-slide-input-required"></div> : null}
			</label>
			{component({ ...rest, ...( dropdown ? {inputRef} : {}), debug, id, value, events, name, required, valueName })}
			{ bar ? <div className='stuff-slide-bar' style={bar}></div> : null }
		</div>
	</React.Fragment>;
};

export default SlideWrapper;