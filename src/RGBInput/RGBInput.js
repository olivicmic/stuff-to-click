import React from 'react';
import Chroma from 'chroma-js';
import rgb from '../resources/rgbArr';
import NumInput from '../NumInput';

export default function RGBInput({value, onChange, mode, ...rest}) {
	const channel = rgb.indexOf(mode);
	let hexToRGB = Chroma(value).rgb();
	let isolateRGB = hexToRGB[channel];

	const handleChange = (newVal) => {
		hexToRGB[channel] = newVal;
		onChange(Chroma(hexToRGB).hex());
	};

	return <NumInput {...rest} value={isolateRGB} max='255' className="stuff-rgb-input" onChange={handleChange}/>;
};