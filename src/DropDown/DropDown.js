import React, { useState, useEffect } from 'react';
import { useTransition, animated, useSpring } from 'react-spring';
import useKeyList  from './useKeyList';
import listTransition  from './listTransition';
import FauxOption  from './FauxOption';

export default function DropDown({ expanded, items = [], listRef, listOffset, listStyle, offPage, debug, rendered, setRendered }) {	
	const transitions = useTransition(expanded, {
		from: { opacity: 0 },
		enter: { opacity: 1,},
		leave: { opacity: 0 },
		config: { friction: 50, tension: 350 }
	});

	const sprung = useSpring({
		transform: `translateY(${ (expanded ? rendered ? -10 : 1 : 0) + 'em' })`,
	});

	useEffect(() => {
		if (!rendered && listRef.current) setRendered(listRef.current);
	});
	/*
	const spring = useSpring({ 
			pause: !offPage,
			left:( offPage[0] || listOffset[0] ) + 'px',
			top: ( offPage[1] || listOffset[1] ) + 'px'
		});*/
	//console.log(offPage);
	return transitions((props, item) => item &&
		<animated.ul ref={listRef} className='stuff-faux-select-list' style={{
			...props,
			...listStyle,
			...sprung,
			left: listOffset[0] + 'px',
			top: listOffset[1] + 'px',
		}}>
			{items}
		</animated.ul>
	);
};