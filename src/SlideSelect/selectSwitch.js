import React, { useState, useRef, useEffect } from 'react';
import Selection  from '../Selection';
import './FauxSelect.scss'

export default function SelectSwitch({ arrow, focus, onFocus, onBlur, name, set = [], tabIndex, value, valueName, style, listStyle, debug, onClick, ...rest }) {
	const optionList = set ? set.map((item,i) => <option value={item.value} key={i}>{item.label}</option>) : null;
	const attrSet = { arrow, name, onClick, onBlur, focus, onFocus, style, tabIndex, set: set, value, valueName, listStyle, debug};

	return(
		<React.Fragment>
			<Selection {...attrSet}/>
			<select {...rest} name={name} value={value} tabIndex={tabIndex}>
				<option value={null} disabled> </option>
				{optionList}
			</select>
		</React.Fragment>
	);
};