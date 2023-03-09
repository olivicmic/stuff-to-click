import React from 'react';
import { animated } from 'react-spring';

export default function Slide({ body: Body, debug, className, pagination, slideRef, slideState, style, ...rest }) {
	return <animated.div { ...{ className: `stuff-slideshow-slide${ className ? ' ' + className : '' }`, ref: slideRef, style } }>
		{ Body && <Body { ...{...rest, pagination, ...slideState } } /> }
	</animated.div>;
};