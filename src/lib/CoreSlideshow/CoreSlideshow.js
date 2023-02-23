import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import { useBusy } from 'hangers';
import { useSlides } from '../hooks';
import { Slide } from 'lib';

export default function CoreSlideshow({ busy, className, debug, extraFixed, extraResize, pagination, paused: inPaused, slides = [], lockHeight, lockWidth, resizeSpring, slideState, ...rest }) {
	const [slideMask, parentCtrls] = useBusy({});
	const [volume, volumeSet] = useState({});
	const paused = inPaused || !pagination.active;

	if (debug) console.log(debug, paused);		

	const expand = useSpring({
		config: resizeSpring || { tension: 120, friction: 14 },
		...!lockWidth && { width: ( volume.width || 0 )},
		...!lockHeight && { height: ( volume.height || 0 )},
		...parentCtrls
	});

	const { busy: slideShift, transitions } = useSlides({
		direction: pagination.direction,
		page: pagination.page, 
		parentCtrls, 
		paused,
		...rest 
	});

	return slides.length > 0 ? <animated.div className={`${ className ? className + ' ' : ''}stuff-slideshow${ slideMask || volume.height === 0 ? ' slideshow-busy' : '' }`}  style={expand}>
		{ transitions((style, i) => <Slide { ...{ busy: { ...busy, slideMask, slideShift }, extraResize, debug, extraFixed, pagination: { ...pagination, isCurrent: i === pagination.page, thisPage: i }, slideState, style, thisSlide: i, volume, volumeSet, ...slides[i] } } />) }
		</animated.div> : null;
};