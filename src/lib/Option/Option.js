import React from 'react';
import { useSpring, animated,config } from 'react-spring';
import { useHover } from 'hangers';

export default function Option({ opacity, overlay, position, index, item, click, value, ...rest }) {
	const focus = position === index;
	const [hover, hoverEvents] = useHover();
	const selected = value === item.value;
	const indicator = () => {
		if (selected && ( hover || focus )) return 'translateX(-0.5em)';
		else if (selected) return 'translateX(0em)';
		else if (hover || focus ) return 'translateX(1em)';
		else return 'translateX(1.5em)';
	};
	const indSpring = useSpring({
		transform: indicator(),
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