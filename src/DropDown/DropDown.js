import React, { useEffect, useState }  from 'react';
import { animated } from 'react-spring';
import useDropDown from './useDropDown';
import useRefWithCallback from '../SlideWrapper/useRefWithCallback';

export default function DropDown({ active, host, listStyle, ...rest }) {
	const [listHeight, listRef] = useRefWithCallback(e => (e?.getBoundingClientRect().height || 0));
 	const { items, listOffset, sprung } = useDropDown({ ...rest, active, host, listHeight });

	return active && items ? <animated.ul key='jammy' ref={listRef} tabIndex='-1' className='stuff-faux-select-list' style={{
			...listStyle,
			...sprung,
			left:  listOffset[0] + 'px',
			top: listOffset[1] + 'px',
		}}>
			{items}
		</animated.ul> : null;
};