import React from 'react';
import Chroma from 'chroma-js';
import IsolateChannel from './IsolateChannel';
import DragSlider from '../DragSlider';

export default function Slider(props) {
	const { value, mode, onChange } = props;
	const rgb = ['red', 'green', 'blue'];
	const channel = rgb.indexOf(mode);
	const isColor = (channel > -1);
	const colorRgb = isColor ? Chroma.valid(value) ? Chroma(value).rgb() : Chroma('#000').rgb() : Chroma('#000').rgb();
	const soloColor = IsolateChannel({color: colorRgb[channel], channel: channel});

	const processColor = (input) => {
		colorRgb[channel] = input[0];
		onChange(Chroma(colorRgb).hex());
	};

	return (
		<DragSlider value={colorRgb[channel]} max={255} onChange={processColor} slide={{backgroundColor: soloColor}} mode={rgb[channel]}/>
	);
};