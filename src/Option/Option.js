import React, { useState } from 'react';
import { useSpring, animated,config } from 'react-spring';

export default function Option({ onFocus, index, position, item, submit, value }) {
	const focus = position === index.index;
	const [hover, setHover] = useState(false);
	const selected = (index.value || value) === item.value;
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

	return(
		<li value={item.value} onClick={e => {

			console.log(e);

			submit(position); 
			onFocus(); 
			//close()
		}} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} >
			<span>{item.label}</span>
			<animated.div className='faux-select-indicator' style={indSpring}></animated.div>
		</li>
	);
};