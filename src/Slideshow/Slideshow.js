import React, { useEffect, useState } from 'react';
import { config, useSpring, animated, useTransition } from 'react-spring';
import { useBusy } from 'hangers';
import Slides from './Slides';
import './Slideshow.scss'

export default function Slideshow({ children, className, ...rest }) {
	const [busy, parentCtrls] = useBusy({});
	const [contentHeight, setHeight] = useState(0);
	const expand = useSpring({
		config: { friction: 50, tension: 350 },
		height: contentHeight || 0,
		...parentCtrls
	});

	return(
		<animated.div className={`${ className ? className + ' ' : ''}stuff-slideshow${ busy || contentHeight === 0 ? ' slideshow-busy' : '' }`}  style={expand}>
			<Slides { ...{ ...rest, parentCtrls, setHeight,} } >
				{ children }
			</Slides>
		</animated.div>
	);
};