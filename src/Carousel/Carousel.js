import React, { useEffect, useState } from 'react';
import { config, useSpring, animated, useTransition } from 'react-spring';
import useResizeAware from 'react-resize-aware';
import Slides from './Slides';
import './Carousel.scss'

export default function Carousel({ children, className, ...rest }) {
	let defaultHeight = 0;
	const [contentHeight, setHeight] = useState(defaultHeight);
	const [resizeListener, sizes] = useResizeAware();
	const expand = useSpring({
		config: { friction: 50, tension: 350 },
		from: { height: contentHeight },
		to: { height: contentHeight }
	});

	return(
		<animated.div className={`stuff-carousel-container${ className && ' ' + className}`}  style={expand}>
			<Slides setHeight={setHeight} { ...rest } >
				{ children }
			</Slides>
		</animated.div>
	);
};