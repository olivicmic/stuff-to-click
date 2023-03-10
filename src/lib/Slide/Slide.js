import React, { useEffect } from 'react';
import { animated } from 'react-spring';
import { useResizeDetector } from 'react-resize-detector';
import { is }  from 'lal';

export default function Slide({ body: Body, debug, className, pagination, slideState, volume, volumeSet, style, ...rest }) {
	const height = is.defined(volume.height, 0);
	const width = is.defined(volume.width, 0);
	const { height: newHeight, width: newWidth, ref } = useResizeDetector();

	useEffect(() => {
		if (pagination.isCurrent) {
			if (height !== newHeight) volumeSet({ width, height: newHeight });
			if (width !== newWidth) volumeSet({	height,	width: newWidth });
		}
	},[debug, height, newHeight, newWidth, pagination.isCurrent, volume, volumeSet, width]);

	return <animated.div { ...{ className: `stuff-slideshow-slide${ className ? ' ' + className : '' }`, ref, style: { ...style, width: 'min-content' } } }>
		{ Body && <Body { ...{...rest, pagination, ...slideState } } /> }
	</animated.div>;
};