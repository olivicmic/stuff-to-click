import React, { useState, useRef, useEffect } from 'react';
import { useTransition, animated } from 'react-spring';
import FauxOption  from './FauxOption';
import useArrowFocus  from './useArrowFocus';
import outsideClose  from './outsideClose';
import selectSwitch  from './selectSwitch';

export default function FauxSelect({ name, onChange, set, value, ...rest }) {
	const [expanded, toggle] = useState(false);
	const [focus, setFocus] = useArrowFocus(set.length);
	const open = () => toggle(true);
	const close = () => toggle(false);

	const listRef = useRef(null);
	outsideClose(listRef, close, setFocus);

	const optionList = set.map((item,i) => {
		return <option value={item.value} key={i}>{item.label}</option>
	});

	const makeChange = (item) => {
		onChange({ target: {...item, name: name}});
		setFocus(-1);
		close();
	};

	const fauxOptionList = set.map((item,i) => {
		return <FauxOption 
			item={item} 
			value={value}
			key={i}
			onChange={makeChange}
			setFocus={setFocus}
			index={i}
			focus={focus === i} />;
	});

	const transitions = useTransition(expanded, null, selectSwitch);

	return(
		<React.Fragment>
			<div ref={listRef}>
				<div className='faux-select' onClick={open}>
					<div className='faux-select-label'>
						{value}
					</div>
					<div className='arrow'></div>
				</div>
				{
					transitions.map(({ item, key, props }) =>
						item && <animated.ul className='faux-select-list' style={props} key={key}>
							{fauxOptionList}
						</animated.ul>
					)
				}				
			</div>		
			<select name={name} value={value} {...rest} onChange={onChange} >
				<option value={null} disabled> </option>
				{optionList}
			</select>
		</React.Fragment>
	);
};