import React, { useEffect, useState } from 'react';
import { animated, useTransition, config } from 'react-spring';
import useResizeAware from 'react-resize-aware';
import usePagination from './usePagination';

export default function Slides({ axis='x', children, enter = {}, from = {}, leave = {}, initial, preset='slot', range = 100, setHeight = () => {} }) {
	const selAxis = ['x','y','xy'].indexOf(axis);
	const { active, direction, page, ...pagination } = usePagination({ count: children && children().length, initial});
	const collection = children ? children({ page, ...pagination }) : [];
	const [resizeListener, sizes] = useResizeAware();
	const onOff = (rng, off) => active ? rng : off;
	const invert = (order, flip, rng) => ((flip ? -1 : 1) * (order ? rng : -rng));
	const xyObj = (rng, flip, xy = 0) => {
		let inRng = invert(direction, flip, rng);
		let ax = num => xy === 2 || xy === num ? inRng && inRng + '%' : 0;
		return {
			transform: `translate3d(${ax(0)},${ax(1)},0)`
		};
	};
	const ways = ['from','leave'];
	const keyStyle = (props) => {
		let way = ways.indexOf(props);
		let isEnter = way === -1;
		return {
			position: isEnter ? 'relative' : 'absolute',
			opacity: onOff([props].opacity || isEnter ? 1 : 0, 1),
			...xyObj(onOff([props].range || isEnter ? 0 : range, 0), isEnter ? 1 : way, selAxis) 
		}
	};
	const makeStyles = () => Object.fromEntries(['enter', ...ways].map((item,i) => [ item, keyStyle(item) ]));
	const transitions = useTransition(page, {
		...makeStyles(),
		config: config.gentle
	});
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