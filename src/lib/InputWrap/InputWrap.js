import React from 'react';
import { useSpring, a, easings } from 'react-spring';
import { useHover } from 'hangers';
import useStuffClasses from './useStuffClasses';
import './InputWrap.scss';

export default function InputWrap({ bar = {}, barFade, className, component, events, focus, debug, dropdown, id, inputRef, label, labelLock, name, onFocus, required, style, tabIndex = 0, valid, value, valueName, type, ...rest }) {
	const [hover, setHover] = useHover({});
	const expand = useSpring({
		config: { mass: 1.75, tension: 300, friction: 25 },
		bottom: `${ valueName || value || value === 0 || focus ? 1.5 : (!labelLock && hover) ? .5 : 0}em`
	});
	const highlight = useSpring({
		config: { duration: 250, easing: easings.easeInOutQuad },
		opacity: focus ? 1 : 0
	});
	const barHover = useSpring({
		opacity: barFade ? focus || hover ? 1 : 0 : 1
	});
	const { labelClass, mainClass } = useStuffClasses({ focus, valid, type });
	return <React.Fragment>
		<div { ...{
			className: `${ mainClass }${ className ? ' ' + className : '' }`,
			id,
			onFocus,
			role: 'textbox',
			style,
			...setHover
		}}>
			<a.div {...{
				className: 'stuff-highlight',
				style: highlight
			}}></a.div>
			<a.label {...{
				className: labelClass,
				htmlFor: id,
				name: name + ' label',
				style: expand
			}}>
				{ label }
				{required ? <div className="stuff-required"></div> : null}
			</a.label>
			{component({ ...rest, ...( dropdown ? {inputRef} : {}), debug, id, value, events, name, required, tabIndex, type, valueName })}
			{ bar ? <a.div {...{ className: 'stuff-bar', style: {...bar, ...barHover}, }} />: null }
		</div>
	</React.Fragment>;
};