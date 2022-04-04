import React, { useState } from 'react';
import { useSpring, animated,config } from 'react-spring';

export default function Option({ busy, opacity, position, index, item, click, value }) {
	const focus = position === index;
	const [hover, setHover] = useState(false);
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

	const ifBusy = (func, v) => busy ? () => {} : () => func(v);

	const itemProps = { 
		onClick: ifBusy(click, position),
		onMouseEnter: ifBusy(setHover, true),
		onMouseLeave: ifBusy(setHover, false),
		value: item.value,
	};

	return(
		<li { ...itemProps } >
			<span>{item.label}</span>
			<animated.div className='faux-select-indicator' style={indSpring}></animated.div>
		</li>
	);
};