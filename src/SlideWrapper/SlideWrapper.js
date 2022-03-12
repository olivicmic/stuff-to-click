import React from "react";
import { useSpring, animated } from 'react-spring';
import useStuffClasses from './useStuffClasses';
import './SlideWrapper.scss';

const SlideWrapper = ({ bar, component, events, focus, debug, dropdown, id, inputRef, label, name, onFocus, setHost, required, set = [], style, valid, value, valueName, ...rest }) => {
	const expand = useSpring({
		config: { mass: 1.75, tension: 300, friction: 25 },
		bottom: `${ value || focus ? 1.5 : 0}em`
	});
	const { labelClass, mainClass } = useStuffClasses({ focus, valid, value });
	return <React.Fragment>
		<div { ...{ className: mainClass, id, onFocus, style, ref: setHost }}>
			<animated.label htmlFor={id} className='stuff-slide-input-label' name={name + ' label'} style={expand}>
				{ label }
				{required ? <div className="stuff-slide-input-required"></div> : null}
			</animated.label>
			{component({ ...rest, ...( dropdown ? {inputRef} : {}), debug, id, value, events, name, required, valueName })}
			{ bar ? <div className='stuff-slide-bar' style={bar}></div> : null }
		</div>
	</React.Fragment>;
};

export default SlideWrapper;