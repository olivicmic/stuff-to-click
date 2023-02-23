import React from 'react';
import { animated, config, useSpring } from 'react-spring';

export default function DragThumb({ hover, isDragged, style }) {
	const centerSpring = useSpring({
		height: isDragged ? '1rem' : hover ? '0.5rem' : '0rem',
		config: config.stiff
	});

	return <animated.div {...{ className: 'drag-slider-center', style: { ...centerSpring, ...style, zIndex: 1} }}></animated.div>;
};