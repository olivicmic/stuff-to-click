import React from 'react';
import { Range } from 'react-range';
import './DragSlider.scss';

export default function Slider(props) {
	const { value, max, mode, onChange, slide } = props;
	return (
		<div className='stuff-drag-slide'>
			<Range step={1} min={0} max={max} values={[value]} onChange={values => onChange( values )}
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