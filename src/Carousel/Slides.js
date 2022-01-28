import React, { useEffect, useState } from 'react';
import { animated } from 'react-spring';
import useResizeAware from 'react-resize-aware';
import usePagination from './usePagination';
import useSlides from './useSlides';

export default function Slides({ axis='x', children, enter = {}, from = {}, leave = {}, initial, range = 100, setHeight = () => {} }) {
	const { active, direction, page, ...pagination } = usePagination({ count: children && children().length, initial});
	const collection = children ? children({ page, ...pagination }) : [];
	const [resizeListener, sizes] = useResizeAware();
	const transitions = useSlides({ axis, direction, enter, from, leave, page, paused: !active, range });
	useEffect(() => {
		if (sizes.height) setHeight(sizes.height);
	});
	const colorSet = ['yellow','cyan','magenta'];
	const slides = collection.map((slide, i) => ({ style }) => 
		<animated.div key={i} className={`stuff-carousel-slide`} style={{ backgroundColor: colorSet[i], ...style}}>
			{ slide }
		</animated.div>
	);
	return <div className='stuff-carousel-content'>
		{ resizeListener }
		{
			transitions((style, i) => {
				const Slide = slides[i];
				return <Slide style={style} />;
			})
		}
	</div>;
};