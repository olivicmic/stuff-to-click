import React from 'react';
import Chroma from 'chroma-js';
import IsolateChannel from './IsolateChannel';
import { Range } from 'react-range';
import './DragSlider.scss';

const Slider = (props) => {
	const { color, channel, onChange } = props;
	const inColor = color ? Chroma.valid(color) ? Chroma(color).rgb() : Chroma('#000') : Chroma('#000');
	const inChan = channel ? channel : 0;
	const rgbSel = ['r','g','b'];
	const soloColor = IsolateChannel({color: inColor[inChan], channel: inChan});

	const processColor = (input) => {
		inColor[inChan] = input[0];
		onChange(Chroma(inColor).hex());
	}

	return (
		<div className='stuff-drag-slide'>
			<Range step={1} min={0} max={255} values={[inColor[inChan]]} onChange={values => processColor( values )}
				renderTrack={({ props, children }) => (
					<div className={`slider-track track-${rgbSel[inChan]}`} {...props}>
						{children}
					</div>
				)}
				renderThumb={({ props }) => (
					<div className="slider" {...props} style={{
						backgroundColor: soloColor}}  />
				)}
	      	/>
      	</div>
	);

}

 export default Slider;