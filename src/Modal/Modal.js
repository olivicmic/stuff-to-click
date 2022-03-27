import React, { useEffect, useState } from 'react';
import { animated } from 'react-spring';
import { useAnimatedDrop } from '../hooks';

export default function Modal({ component: Component, fade = 0, modals, modID, modState, opacity, position, setKill, at = [0,0], from = [0,0], ...rest }) {
	console.log(modals);
	const [rendered, setRendered] = useState(false);

	return <animated.div className={`stuff-modal${ modID ? ' modalID-' + modID : '' }`} style={{ 
		opacity: opacity.to(y => Math.max(y,fade)),
		transform: opacity.to(y => `translate(0px, ${(1 - y) * from[1]}px)`),
		top: `${at[1]}px`, 
		left: `${at[0]}px` 
	}}>
		<Component { ...{ ...rest, modID, modals, position, state: modState[position] || {},  setKill }} />
	</animated.div>;
};