import React, { useEffect, useState } from 'react';
import { config, useSpring, animated, useTransition } from 'react-spring';
import { useBusy } from 'hangers';
import Slides from './Slides';
import './Slideshow.scss'

export default function Slideshow({ debug = false, children, className, onChange = () => {}, ...rest }) {
	const [busy, parentCtrls] = useBusy({});
	const [updated, setUpdated] = useState(false);
	const [height, setHeight] = useState(0);
	const expand = useSpring({
		config: { friction: 50, tension: 350 },
		...( updated ? height ? { height } : {} : {}),
		...parentCtrls
	});
	const newChange = e => {
		setUpdated(true);
		onChange(e);
	};
	if (debug) console.log('slideshow debug',{ updated });

	return children && children().length > 0 ? <animated.div className={`${ className ? className + ' ' : ''}stuff-slideshow${ busy || height === 0 ? ' slideshow-busy' : '' }`}  style={expand}>
			<Slides { ...{ ...rest, onChange: newChange, parentCtrls, setHeight, updated } } >
				{ children }
			</Slides>
		</animated.div> : null;
};