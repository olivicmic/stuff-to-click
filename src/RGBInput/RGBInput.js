import React from 'react';
import Chroma from 'chroma-js';
import rgb from '../resources/rgbArr';

export default function RGBInput({value, onChange, mode, ...rest}) {
	const channel = rgb.indexOf(mode);
	let hexToRGB = Chroma(value).rgb();
	let isolateRGB = hexToRGB[channel];

	const handleChange = (e) => {
		hexToRGB[channel] = e.currentTarget.value;
		onChange(Chroma(hexToRGB).hex());
	};

	return <input type="number" value={isolateRGB} className="stuff-rgb-input" onChange={handleChange} {...rest}/>
};