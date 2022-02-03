import React, { useState, useRef, useEffect } from 'react';
import { useTransition, animated } from 'react-spring';
import outsideClose  from './outsideClose';
import useKeyList  from './useKeyList';
import listTransition  from './listTransition';
import FauxOption  from './FauxOption';

export default function DropDown({arrow: Arrow, focus, listRef, onChange, name, value, set = [], listOffset, listStyle, debug, setValueName,expanded, close, index, setIndex, ...rest}) {	

	const transitions = useTransition(expanded, listTransition);

	outsideClose(listRef, close, setIndex, debug);
	useEffect(() => { 
		if (!focus && !debug) close();
		if (value) {
			set.forEach((item, i) => {
				if (value === item.value)setValueName(item.label);
				else if (i === (set.length - 1)) setValueName(null);
			});
		}
	},[value]);

	const makeChange = (item) => {
		onChange({ target: {...item, name}});
		setIndex(-1);
		setValueName(item.label);
		close();
	};

	const fauxOptionList = set.map((item, i ) => {
		return <FauxOption { ...{  i , item, value,}}
			key={ i }
			onChange={makeChange}
			setFocus={setIndex}
			focus={index ===  i }
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