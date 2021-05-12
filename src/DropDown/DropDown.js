import React, { useState, useRef, useEffect } from 'react';
import { useTransition, animated } from 'react-spring';
import outsideClose  from './outsideClose';
import useKeyInput  from './useKeyInput';
import listTransition  from './listTransition';
import FauxOption  from './FauxOption';

export default function DropDown({arrow: Arrow, focus, onChange, name, value, set, listOffset, listStyle, debug, setValueName,expanded, open, close, ...rest}) {	
	const listRef = useRef(null);
	const [optionFocus, setOptionFocus] = useKeyInput(set, onChange, name, setValueName, expanded, focus, open, close);
	const transitions = useTransition(expanded, listTransition);

	outsideClose(listRef, close, setOptionFocus, debug);
	useEffect(() => { 
		if (!focus && !debug) close();
		if (value) {
			let matched = false;
			set.forEach((item, i) => {
				if (value === item.value) {
					setValueName(item.label);
					matched = true;
				}
				else if (i === (set.length - 1) && !matched) setValueName(null);
			});
		}
	},[value]);

	const makeChange = (item) => {
		onChange({ target: {...item, name: name}});
		setOptionFocus(-1);
		setValueName(item.label);
		close();
	};

	const fauxOptionList = set.map((item,i) => {
		return <FauxOption 
			item={item} 
			value={value}
			key={i}
			onChange={makeChange}
			setFocus={setOptionFocus}
			index={i}
			focus={optionFocus === i}
			 />;
	});

	return(		
		transitions((props, item) => item &&
			<animated.ul ref={listRef} className='stuff-faux-select-list' style={{
				...props,
				...listStyle,
				left: listOffset[0] + 'px',
				top: listOffset[1] + 'px',
			}}>
				{fauxOptionList}
			</animated.ul>
		)
	);
};