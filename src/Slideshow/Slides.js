import React, { useEffect, useState } from 'react';
import { animated } from 'react-spring';
import useResizeAware from 'react-resize-aware';
import { usePagination } from 'hangers';
import useSlides from './useSlides';

export default function Slides({ children, initial, onChange, setHeight = () => {}, ...slideProps }) {
	const { active, direction, page, ...pagination } = usePagination({ 
		count: children ? children().length : 0, 
		initial, 
		onChange
	});
	const [rendered, setRendered] = useState(false);
	const { busy, transitions } = useSlides({ direction, page, paused: !active, ...slideProps });
	const collection = children ? children({ busy, page, ...pagination }) : [];
	const [resizeListener, sizes] = useResizeAware();

	useEffect(() => {
		setRendered(true);
		if (sizes.height) setHeight(sizes.height);
	},[sizes, setRendered]);

	const slides = collection.map((slide, i) => ({ style }) => 
		<animated.div key={i} className={`stuff-slideshow-slide`} style={style}>
			{ slide }
		</animated.div>
	);
	return <div className='stuff-slideshow-content'>
		{ resizeListener }
		{
			rendered ? transitions((style, i) => {
				const Slide = slides[i];
				return <Slide style={style} />;
			}) : null
		}
	</div>;
};