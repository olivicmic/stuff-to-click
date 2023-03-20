
import React from 'react';
import { useSpring, animated } from 'react-spring';
import useResizeObserver from 'use-resize-observer/polyfilled';
import { useBusy } from 'hangers';
import { useSlides } from '../hooks';
import { TestSlide } from '..';

export default function CoreSlideshow({ busy, className, debug, pagination = {}, paused: inPaused, slides = [], lockHeight, lockWidth, resizeSpring, slideState, ...rest }) {
	const [slideMask, parentCtrls] = useBusy();
	const paused = inPaused || !pagination.active;
	const { height, width, ref: slideRef } = useResizeObserver();
	const expand = useSpring({
		config: resizeSpring || { tension: 120, friction: 14 },
		...!lockWidth && { width },
		...!lockHeight && { height },
		...parentCtrls
	});
	const { busy: slideShift, transitions } = useSlides({
		direction: pagination.direction,
		page: pagination.page, 
		parentCtrls, 
		paused,
		...rest 
	});

	if (debug) console.log(debug, paused);	

	return slides.length > 0 ? <animated.div className={`${ className ? className + ' ' : ''}stuff-slideshow${ slideMask || height === 0 ? ' slideshow-busy' : '' }`}  style={expand}>
		{ transitions((style, i) => <TestSlide { ...{ 
			busy: { ...busy, slideMask, slideShift }, 
			debug, 
			pagination: { ...pagination, isCurrent: i === pagination.page, thisPage: i },
			slideRef,
			slideState,
			style,
			thisSlide: i,
			...slides[i]
		}} />) }
		</animated.div> : null;
};