import React from 'react';
import { useSpring, animated, useTransition } from 'react-spring';
import useResizeAware from 'react-resize-aware';

export default function Carousel({ ...rest }) {
	 defaultHeight = 0;
	const [page, setPage] = useState(0);
	const [contentHeight, setContentHeight] = useState(defaultHeight);
	const [resizeListener, sizes] = useResizeAware();
	const expand = useSpring({
		config: { friction: 50, tension: 350 },
		from: { height: 0 },
		to: {height: expanded ? contentHeight : 0}
	});


	const transitions = useTransition(page, {
		from: { opacity: 0 },
		enter: { opacity: 1 },
		leave: { opacity: 0 },
		//delay: 200,
		config: config.molasses,
		//onRest: () => setItems([]),
	})
	// fruits below should become an array of components, then rendered within the animated.divs
	const Slides = ({ back, forward}) => ['Apple','Banana','carrot'].map((item, i) => page === i ? <animated.div>
		<h3>{i}</h3>
		<span>{item}</span>
	</animated.div> : null);

	useEffect(() => {
		if (sizes.height) setContentHeight(sizes.height);
	});

	return(
		<animated.div { ...rest } style={expand}>
			{resizeListener}
			<Slides />
		</animated.div>
	);
};