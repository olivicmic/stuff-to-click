import React, { useEffect, useRef } from 'react';
import { animated } from 'react-spring';
import { is }  from 'lal';

export default function Slide({ body: Body, debug, className, pagination, slideState, volume, volumeSet, style, ...rest }) {
	const height = is.defined(volume.height, 0);
	const width = is.defined(volume.width, 0);
	const ref = useRef();

	useEffect(() => {
		const main = { width: ref?.current?.clientWidth || 0, height: ref?.current?.clientHeight || 0 };
		
		if (pagination.isCurrent) {
			let newHeight = main.height;
			let newWidth = main.width;

			if (height !== newHeight) volumeSet({ width, height: newHeight 	}); 
			if (width !== newWidth) volumeSet({	height,	width: newWidth });
			
		}
	},[debug, height, pagination.isCurrent, ref, volume, volumeSet, width]);

	return <animated.div { ...{ className: `stuff-slideshow-slide${ className ? ' ' + className : '' }`, ref, style } }>
		{ Body && <Body { ...{...rest, pagination, ...slideState } } /> }
	</animated.div>;
};