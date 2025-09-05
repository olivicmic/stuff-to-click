import React from 'react';
import { useSpring, animated,config } from 'react-spring';
import { useHover } from 'hangers';

export default function Option({ name, opacity, overlay, position, index, item, click, value, ...rest }) {
	const { component: Component, onClick, ...option } = item || {};
	const focus = position === index;
	const [hover, hoverEvents] = useHover({});
	const selected = value === option.value;
	const indicator = () => {
		if (selected || focus) { return hover ? -.5 : 0; }
		else return hover ? 1 : 1.5; 
	};

	const indSpring = useSpring({
		transform: `translateX(${indicator()}em)`,
		config: config.wobbly
	});

	const itemProps = { 
		...hoverEvents,
		onClick: () => { if (!overlay.busy) {
			click(option.value);
			if (onClick) onClick({ target: { name, type: 'option', ...option } })
		}},
		value: option.value,
	};

	return(
		<li { ...itemProps } >
			{ Component ? <Component { ...option }/> : <span>{ option.label }</span> }
			<animated.div className='faux-select-indicator' style={indSpring}></animated.div>
		</li>
	);
};