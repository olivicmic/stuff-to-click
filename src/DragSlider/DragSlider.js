import React from 'react';
import { Range } from 'react-range';
import './DragSlider.scss';

export default function Slider({ value, max = 100, mode, onChange, slide, ...rest }) {
	const toDo = newVal => onChange(newVal[0]);
	return (
		<div className='stuff-drag-slide'>
			<Range {...rest} step={1} min={0} max={max} values={[value]} onChange={toDo}
				renderTrack={({ props, children }) => (
					<div className={`stuff-drag-slider-track${ mode ? ` stuff-drag-track-${mode}` : ''}`} {...props}>
						{children}
					</div>
				)}
				renderThumb={({ props }) => (
					<div className="stuff-drag-slider" {...props} style={slide}  />
				)}
	      	/>
      	</div>
	);
};