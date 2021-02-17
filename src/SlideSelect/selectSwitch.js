import React, { useState, useRef, useEffect } from 'react';
import FauxSelect  from './FauxSelect';
import './FauxSelect.scss'

export default function SelectSwitch({ arrow, focus, onFocus, onBlur, name, onChange, set, tabIndex, value, style, listStyle, debug, ...rest }) {
	
	const optionList = set.map((item,i) => <option value={item.value} key={i}>{item.label}</option>);
	const attrSet = { arrow, onChange, name, onBlur, focus, onFocus, style, tabIndex, set: set, value, listStyle, debug};

	return(
		<React.Fragment>
			<FauxSelect {...attrSet}/>
			<select {...rest} name={name} value={value} onChange={onChange} tabIndex={tabIndex}>
				<option value={null} disabled> </option>
				{optionList}
			</select>
		</React.Fragment>
	);
};