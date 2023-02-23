import React, { useEffect, useState, useRef } from 'react';
import { animated } from 'react-spring';
import { is }  from 'lal';

export default function Slide({ body: Body, debug, className, extraFixed, extraResize, pagination, slideState, volume, volumeSet, style, ...rest }) {
	const height = is.defined(volume.height, 0);
	const width = is.defined(volume.width, 0);
	const [limiter, limiterSet] = useState(1);
	const ref = useRef();

	useEffect(() => {

		const main = { 
			width: ref?.current?.clientWidth || 0,
			height: ref?.current?.clientHeight || 0
		};
		
		if (pagination.isCurrent) {
			let newHeight = main.height + (extraResize?.height || 0) + (extraFixed?.height || 0);
			let newWidth = main.width + (extraFixed?.width || 0);

			if (height !== newHeight) volumeSet({
				width,
				height: newHeight 
			}); 
			if (limiter && is.defined(main.width) && width !== newWidth){
				volumeSet({
					height,
					width: newWidth 
				});
				limiterSet(limiter - 1);
			}
		}
	},[debug, extraFixed, extraResize, height, limiter, pagination.isCurrent, ref, volume, volumeSet, width]);

	return <animated.div { ...{ className: `stuff-slideshow-slide${ className ? ' ' + className : '' }`, ref, style } }>
		{ Body && <Body { ...{...rest, pagination, ...slideState } } /> }
	</animated.div>;
};