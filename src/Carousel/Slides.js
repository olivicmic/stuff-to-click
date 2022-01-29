import React, { useEffect, useState } from 'react';
import { animated } from 'react-spring';
import useResizeAware from 'react-resize-aware';
import usePagination from './usePagination';
import useSlides from './useSlides';

export default function Slides({ children, initial, setHeight = () => {}, ...slideProps }) {
	const { active, direction, page, ...pagination } = usePagination({ count: children && children().length, initial});
	const { busy, transitions } = useSlides({ direction, page, paused: !active, ...slideProps });
	const collection = children ? children({ busy, page, ...pagination }) : [];
	const [resizeListener, sizes] = useResizeAware();
	useEffect(() => {
		if (sizes.height) setHeight(sizes.height);
	});
	const colorSet = ['yellow','cyan','magenta'];
	const slides = collection.map((slide, i) => ({ style }) => 
		<animated.div key={i} className={`stuff-carousel-slide`} style={{ ...style, backgroundColor: colorSet[i] }}>
			{ slide }
		</animated.div>
	);
	return <div className='stuff-carousel-content'>
		{ resizeListener }
		{
			transitions((style, i) => {
				//console.log(style);
				const Slide = slides[i];
				return <Slide style={style} />;
			})
		}
	</div>;
};