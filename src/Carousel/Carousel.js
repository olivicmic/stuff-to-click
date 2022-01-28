import React, { useEffect, useState } from 'react';
import { config, useSpring, animated, useTransition } from 'react-spring';
import useResizeAware from 'react-resize-aware';
import Slides from './Slides';
import './Carousel.scss'

export default function Carousel({ ...rest }) {
	let defaultHeight = 0;
	const [contentHeight, setHeight] = useState(defaultHeight);
	const [resizeListener, sizes] = useResizeAware();
	const expand = useSpring({
		config: { friction: 50, tension: 350 },
		from: { height: 0 },
		to: { height: contentHeight }
	});
	const AThing = ({ atStart, atEnd, back, num, value, forward, ...more }) => {
		console.log(more);
		return <div>
			<button onClick={back} disabled={atStart}>Back</button>
				{ num + ': ' + value }
			<button onClick={forward} disabled={atEnd}>Next</button>
		</div>;
	};
	const things = ['Apple','Banana','carrot'];
	const theThings = (props) => things.map((thing, i) => <AThing num={i} value={thing} key={i} {...props}/>);

	return(
		<animated.div className={`stuff-carousel-container`} { ...rest } style={expand}>
			
				<Slides setHeight={setHeight}>
					{ theThings }
				</Slides>
		</animated.div>
	);
};