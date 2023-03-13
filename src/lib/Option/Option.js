import React from 'react';
import { useSpring, animated,config } from 'react-spring';
import { useHover } from 'hangers';

export default function Option({ opacity, overlay, position, index, item, click, value, ...rest }) {
	const focus = position === index;
	const [hover, hoverEvents] = useHover();
	const selected = value === item.value;
	if (position === 0) console.log({position, selected, focus, index, hover});
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
		onClick: () => !overlay.busy && click(item.value),
		value: item.value,
	};

	return(
		<li { ...itemProps } >
			<span>{item.label}</span>
			<animated.div className='faux-select-indicator' style={indSpring}></animated.div>
		</li>
	);
};