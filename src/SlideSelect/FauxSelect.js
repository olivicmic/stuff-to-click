import React, { useState, useRef, useEffect } from 'react';
import { useTransition, animated } from 'react-spring';
import FauxOption  from './FauxOption';
import useArrowFocus  from './useArrowFocus';

const outsideClose = (ref, close) => {
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (ref.current && !ref.current.contains(event.target)) {
				close();
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
		// Unbind the event listener on clean up
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [ref]);
};

export default function FauxSelect({ name, onChange, set, value, ...rest }) {
	const [expanded, toggle] = useState(false);
	const [focus, setFocus] = useArrowFocus(set.length);
	const open = () => toggle(true);
	const close = () => toggle(false);

	const listRef = useRef(null);
	outsideClose(listRef, close);

	const optionList = set.map((item,i) => {
		return <option value={item.value} key={i}>{item.label}</option>
	});

	const makeChange = (item) => {
		onChange({ target: {...item, name: name}});
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

	const transitions = useTransition(expanded, null, {
		from: { opacity: 0, transform: 'translateY(0em)'},
		enter: { opacity: 1, transform: 'translateY(0.5em)'},
		leave: { opacity: 0, transform: 'translateY(0em)'},
    	config: { friction: 50, tension: 350 }
	});

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