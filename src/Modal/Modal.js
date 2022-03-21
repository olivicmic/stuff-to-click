import React, { useEffect, useState } from 'react';
import { animated } from 'react-spring';
import { useAnimatedDrop } from '../hooks';

export default function Modal({ children, cutModal, modID, modState, setMod, x = 0, y = 0, kill, position, setKill, ...rest }) {
	console.log(rest);
	//const [modState, setMod] = useState();
	const [rendered, setRendered] = useState(false);
	const [sprung, enter, exit] = useAnimatedDrop({ 
		from: [x - 100, y - 100],
		to: [x,y], 
		onRest: () => { cutModal(position); setRendered(false); }
	});
	const NewChild = { ...children, props: { ...children?.props, modID, modState, setMod, position, setKill } };
	useEffect(() => {
		if (kill === position) { setKill(-1); exit(); }
	}, [kill, position]);
	useEffect(() => {
		if (!rendered) { enter(1); setRendered(true); }
	});

	return <animated.div className='stuff-modal' style={sprung}>{ NewChild }</animated.div>;
};