import React from "react";
import { useSpring, animated } from 'react-spring';
import useStuffClasses from './useStuffClasses';
import './InputWrap.scss';

export default function InputWrap({ bar = {}, component, events, focus, debug, dropdown, id, inputRef, label, name, onFocus, setHost, required, set = [], style, tabIndex = 0, valid, value, valueName, type, ...rest }) {
	const expand = useSpring({
		config: { mass: 1.75, tension: 300, friction: 25 },
		bottom: `${ value || focus ? 1.5 : 0}em`
	});
	const { labelClass, mainClass } = useStuffClasses({ focus, valid, type });
	return <React.Fragment>
		<div { ...{ className: mainClass, id, onFocus, style, ref: setHost }}>
			<animated.label htmlFor={id} className={labelClass} name={name + ' label'} style={expand}>
				{ label }
				{required ? <div className="stuff-required"></div> : null}
			</animated.label>
			{component({ ...rest, ...( dropdown ? {inputRef} : {}), debug, id, value, events, name, required, tabIndex, valueName })}
			{ bar ? <div className='stuff-bar' style={bar}></div> : null }
		</div>
	</React.Fragment>;
};