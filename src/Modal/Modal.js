import React, { useEffect, useState } from 'react';
import { animated } from 'react-spring';
import { useAnimatedDrop } from '../hooks';

export default function Modal({ component: Component, cutModal, modID, kill, position, setKill, to = [0,0], from = [0,0], ...rest }) {
	const [rendered, setRendered] = useState(false);
	const [sprung, enter, exit] = useAnimatedDrop({ 
		from,
		onRest: () => { cutModal(position); setRendered(false); }
	});
	useEffect(() => {
		if (kill === position) { setKill(-1); exit(); }
	}, [kill, position]);
	useEffect(() => {
		if (!rendered) { enter(1); setRendered(true); }
	});

	return <animated.div className='stuff-modal' style={{ ...sprung, top: `${to[1]}px`, left: `${to[0]}px` }}>
		<Component { ...{ ...rest, modID, position, setKill }} />
	</animated.div>;
};