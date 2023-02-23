import React from 'react';
import { Range } from 'react-range';
import { useHover } from 'hangers';
import DragThumb from './DragThumb';
import './DragSlider.scss';

export default function Slider({ className, handleStyle, max = 100, min = 0, name, onChange: toDo, step = 1, thumbStyle, trackStyle, type, value, ...rest }) {
	const [hover, hoverProps] = useHover();
	const onChange = newVal => toDo({ target: { ...name && { name }, ...type && { type }, value: newVal[0] }});
	return <div {...{ className: `drag-slider${className ? ' ' + className : ''}` }}>
		<Range {...{...rest, max, min, onChange, step, values: [value] }}
			renderTrack={({ props, children }) => (
				<div {...{ 
					className: 'drag-slider-track-container',
					onMouseDown: props.onMouseDown,
					onTouchStart: props.onTouchStart,
					style: props.style
				}}>
					<div {...{ className: 'drag-slider-track', ref: props.ref, style: trackStyle	}}>
						{ children }
					</div>
				</div>
			)}
			renderThumb={({ props:{ key, ...thumbProps}, isDragged }) => <React.Fragment {...{key}}>
				<div {...{ 
					...thumbProps,
					...hoverProps,
					className: 'drag-slider-thumb',
					style: thumbStyle
				}} >
					<DragThumb { ...{ hover, isDragged, style: handleStyle }}/>
				</div>
			</React.Fragment>}
		/>
	</div>;
};