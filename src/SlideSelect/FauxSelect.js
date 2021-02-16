import React, { useState, useRef, useEffect } from 'react';
import { useTransition, animated } from 'react-spring';
import outsideClose  from './outsideClose';
import useArrowFocus  from './useArrowFocus';
import listTransition  from './listTransition';
import FauxOption  from './FauxOption';

export default function FauxSelect({arrow: Arrow, focus, onChange, name, value, set, listStyle, ...rest}) {
	const listRef = useRef(null);
	const [expanded, expand] = useState(false);	
	const open = () => expand(true);
	const close = () => expand(false);
	const [label, setLabel] = useState(null);	
	const [optionFocus, setOptionFocus] = useArrowFocus(set, expanded, expand, close, onChange, name, focus, setLabel);
	const transitions = useTransition(expanded, null, listTransition);

	outsideClose(listRef, close, setOptionFocus);
	useEffect(() => { 
		if (!focus) close();
		if (value) {
			let matched = false;
			set.forEach((item, i) => {
				if (value === item.value) {
					setLabel(item.label);
					matched = true;
				}
				else if (i === (set.length - 1) && !matched) setLabel(null);
			});
		}
	},[focus, value]);

	const makeChange = (item) => {
		onChange({ target: {...item, name: name}});
		setOptionFocus(-1);
		setLabel(item.label);
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
			focus={optionFocus === i} />;
	});

	return(
		<React.Fragment>			
			<div className='stuff-faux-select' onClick={open} {...rest}>
				<div className='stuff-faux-select-label'>
					{label ? label : value}
				</div>
				{Arrow ?
					<Arrow className='stuff-faux-select-marker'/> :
					<div className='stuff-faux-select-marker'>
						<div className='stuff-faux-arrow'></div>
					</div>}
			</div>
			{
				transitions.map(({ item, key, props }) =>
					item && <animated.ul className='stuff-faux-select-list' style={{...props, ...listStyle}} key={key}>
						{fauxOptionList}
					</animated.ul>
				)
			}
		</React.Fragment>
	);
};