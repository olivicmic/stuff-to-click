import React, { useEffect, useState } from 'react';
import { animated, useTransition, config } from 'react-spring';
import useResizeAware from 'react-resize-aware';
import usePagination from './usePagination';

export default function Slides({ children, initial, setHeight = () => {} }) {
	const { direction, page, ...pagination } = usePagination({ count: children && children().length, initial});
	const [toLeft, setLEft] = useState(false);
	const collection = children ? children({ page, ...pagination }) : [];
	const [resizeListener, sizes] = useResizeAware();
	const rng = 100;
	const presets = {
		fade: {
			from: { opacity: 0 },
			enter: { opacity: 1 },
			leave: { opacity: 0 },
			config: config.molasses,
		}, slot: {
			from: { position: 'absolute', transform: `translate3d(${direction ? rng : -rng}%,0,0)` },
			enter: { position: 'relative', transform: `translate3d(0%,0,0)` },
			leave: { position: 'absolute', transform: `translate3d(${direction ? -rng : rng}%,0,0)` },
			config: config.gentle
		}
	};
	const transitions = useTransition(page, presets.slot)
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