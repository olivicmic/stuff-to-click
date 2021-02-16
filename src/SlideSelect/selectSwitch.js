import React, { useState, useRef, useEffect } from 'react';
import { useTransition, animated } from 'react-spring';
import FauxOption  from './FauxOption';
import useArrowFocus  from './useArrowFocus';
import outsideClose  from './outsideClose';
import listTransition  from './listTransition';
import './FauxSelect.scss'

export default function SelectSwitch({ arrow: Arrow, focus, onFocus, onBlur, name, onChange, set, tabIndex, value, style, ...rest }) {	
	const listRef = useRef(null);
	const [expanded, expand] = useState(false);	
	const open = () => expand(true);
	const close = () => expand(false);
	const [optionFocus, setOptionFocus] = useArrowFocus(set, expanded, expand, close, onChange, name, focus);
	outsideClose(listRef, close, setOptionFocus);

	const optionList = set.map((item,i) => <option value={item.value} key={i}>{item.label}</option>);

	const makeChange = (item) => {
		onChange({ target: {...item, name: name}});
		setOptionFocus(-1);
		close();
	};

	useEffect(() => { if (!focus) close(); });

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

	const transitions = useTransition(expanded, null, listTransition);
	const attrSet = {onBlur, onFocus, style, tabIndex, onClick: open, ref: listRef};

	return(
		<React.Fragment>			
			<div className='stuff-faux-select' {...attrSet}>
				<div className='stuff-faux-select-label'>
					{value}
				</div>
				{Arrow ?
					<Arrow className='stuff-faux-select-marker'/> :
					<div className='stuff-faux-select-marker'>
						<div className='stuff-faux-arrow'></div>
					</div>}
			</div>
			{
				transitions.map(({ item, key, props }) =>
					item && <animated.ul className='stuff-faux-select-list' style={props} key={key}>
						{fauxOptionList}
					</animated.ul>
				)
			}
			<select name={name} value={value} {...rest} onChange={onChange} tabIndex={tabIndex}>
				<option value={null} disabled> </option>
				{optionList}
			</select>
		</React.Fragment>
	);
};