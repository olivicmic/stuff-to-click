import React, { useState, useRef, useCallback } from 'react';
import { useSpring, animated,config } from 'react-spring';

export default function FauxOption({ onChange, value, item, focus, index, setFocus}) {
	const [hover, setHover] = useState(false);
	const ref = useRef(null);
	const active = value === item.value;
	const indicator = () => {
		if (active && ( hover || focus )) return 'translateX(-0.5em)';
		else if (active) return 'translateX(0em)';
		else if (hover || focus ) return 'translateX(1em)';
		else return 'translateX(1.5em)';
	};
	const indSpring = useSpring({
		transform: indicator(),
		config: config.wobbly
	});

	const handleSelect = useCallback(() => {
		setFocus(index);
	}, [index, setFocus]);

	return(
		<li value={item.value} onClick={() => onChange(item)} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} onKeyPress={handleSelect}>
			<span>{item.label}</span>
			<animated.div className='faux-select-indicator' style={indSpring}></animated.div>
		</li>
	);
};