import React from 'react';

export default function NumInput({value, onChange, max = 100, ...rest}) {
	const numOnly = new RegExp(/^[0-9]+$/i); // allowed key inputs (numbers only)
	const onKeyPress = e => { if (!numOnly.test(e.key)) e.preventDefault(); }; // block invalid keys
	const digiCap = (newVal) => newVal.toString().length <= max.toString().length; // determine if val is too many digits
	const limitNum = (newVal) => newVal > max ? max : newVal < 0 ? 0 : newVal; // limit val within min/max
	const send = (newVal) => onChange(digiCap(newVal) ? limitNum(newVal) : value); //return val if in limits
	const onType = (e) => send(parseInt(e.target.value) || 0); // handle typed input, return as number, 0 if empty
	const onKeyDown = e => {
		if (e.keyCode === 38) send(value + 1); // up arrow adds one
		if (e.keyCode === 40) send(value - 1); // down arrow subtracts one
	};

	return <input {...rest} onChange={onType} type="text" pattern="[0-9]*" value={value} onKeyPress={onKeyPress} onKeyDown={onKeyDown}/>;
};