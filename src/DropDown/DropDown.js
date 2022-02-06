import React, { useState, useEffect } from 'react';
import { useTransition, animated, useSpring } from 'react-spring';
import useKeyList  from './useKeyList';
import listTransition  from './listTransition';
import FauxOption  from './FauxOption';

export default function DropDown({ active, expanded, height, hostRef, items = [], listRef, listOffset, listStyle, offPage, debug, rendered, setRendered, sprung }) {
/*	
	const transitions = useTransition(expanded, {
		from: { opacity: 0 },
		enter: { opacity: 1,},
		leave: { opacity: 0 },
		config: { friction: 50, tension: 350 }
	}); */
	const host = hostRef.current;
	const list = listRef.current;
	const hostHeight = host ? parseInt(host.getBoundingClientRect().height) : 0;
	const font = host ? 
		parseInt(getComputedStyle(host).getPropertyValue('font-size').slice(0,-2) ) : 0;
/*
	useEffect(() => {
		if (!rendered) {
			setRendered(true);
		}
	},[expanded, rendered, setRendered]);
*/	
	return active && items ? <animated.ul key='jammy' ref={listRef} tabIndex='-1' className='stuff-faux-select-list' style={{
			//...props,
			...listStyle,
			...sprung,
			left:  listOffset[0] + 'px',
			top: listOffset[1] + 'px',
		}}>
			{items}
		</animated.ul> : null;
};