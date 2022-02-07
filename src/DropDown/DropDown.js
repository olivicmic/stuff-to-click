import React, { useState, useEffect } from 'react';
import { useTransition, animated, useSpring } from 'react-spring';
import useKeyList  from './useKeyList';
import listTransition  from './listTransition';
import FauxOption  from './FauxOption';

export default function DropDown({ active, expanded, items = [], listRef, listOffset, listStyle, debug, sprung }) {
	
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