import React, { useState } from 'react';
import { useSpring, animated,config } from 'react-spring';

export default function FauxOption({ onChange, value, item }) {
	const [hover, setHover] = useState(false);
	const active = value === item.value;
	const indSpring = useSpring({
		transform: active | hover ? 'translateX(0px)' : 'translateX(20px)',
		config: config.stiff
	});
	return(
		<React.Fragment>
			<li value={item.value} onClick={() => onChange(item)} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
				{item.label}
				<animated.div className='faux-select-indicator' style={indSpring}></animated.div>
			</li>
			<hr />
		</React.Fragment>
	);
};