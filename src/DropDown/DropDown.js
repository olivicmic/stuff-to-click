import React, { useState, useEffect } from 'react';
import { useTransition, animated, useSpring } from 'react-spring';
import useKeyList  from './useKeyList';
import listTransition  from './listTransition';
import FauxOption  from './FauxOption';

export default function DropDown({ expanded, hostRef, items = [], listRef, listOffset, listStyle, offPage, debug, rendered, setRendered }) {	
	const transitions = useTransition(expanded, {
		from: { opacity: 0 },
		enter: { opacity: 1,},
		leave: { opacity: 0 },
		config: { friction: 50, tension: 350 }
	});
	const host = hostRef.current;
	const hostHeight = host ? parseInt(host.getBoundingClientRect().height) : 0;
	const font = host ? 
		parseInt(getComputedStyle(host).getPropertyValue('font-size').slice(0,-2) ) : 0;

	//console.log(host, hostHeight, font);
	const jammy = () => {
		let str = 0;
		if (expanded) {
			if (offPage && rendered) str = -( hostHeight + parseInt(rendered.height) + font );
			else str = font;
		}
		//if (rendered) console.log("joomy");
		return str + 'px'
	};
	const sprung = useSpring({
		config: { friction: 50, tension: 350 },
		//transform: `translateY(${jammy}`,
		transform: `translateY(${ (expanded ? ( offPage && rendered ) ? -(hostHeight + parseInt(rendered.height) + font ): font : 0) + 'px' })`,
	});

	useEffect(() => {
		if (!rendered && listRef.current) {
			//let listBox = listRef.current.getBoundingClientRect();
			//let listBottom = listBox.y + listBox.height;
			setRendered(listRef.current.getBoundingClientRect());
		}
		if (!expanded && rendered) return setRendered(null);
	},[expanded, rendered, setRendered, listRef]);
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
			left:  listOffset[0] + 'px',
			top: listOffset[1] + 'px',
		}}>
			{items}
		</animated.ul>
	);
};