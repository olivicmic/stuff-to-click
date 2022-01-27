import React, { useEffect, useState } from 'react';
import { animated, useTransition, config } from 'react-spring';
import useResizeAware from 'react-resize-aware';

export default function Slides({ children, initial = 0, setHeight = () => {} }) {
	//console.log(children);
	const [page, setPage] = useState(initial);
	//console.log(page);
	const count = children && children().length;
	const atStart = (page <= 0);
	const atEnd = (page >= count -1);
	const back = () => !atStart && setPage(page - 1);
	const forward = () => !atEnd && setPage(page + 1);
	const goTo = index => index > -1 && index < count && setPage(index);


	const collection = children ? children({ atEnd, atStart, back, count, forward, goTo, page, setPage }) : [];
	const [resizeListener, sizes] = useResizeAware();
		const transitions = useTransition(page, {
		from: { opacity: 0 },
		enter: { opacity: 1 },
		leave: { opacity: 0 },
		//delay: 200,
		config: config.molasses,
		//onRest: () => setItems([]),
	})
	useEffect(() => {
		if (sizes.height) setHeight(sizes.height);
	});
	//const Child = ({ child }) => <React.Fragment></React.Fragment>;
	//let collection = [ ...children ];
	//collection.shift();
	//console.log(collection);
	return <div className='stuff-carousel-content'>
		{ resizeListener }
		{
			transitions((style, i) => {
				return page === i ? 
					<animated.div key={i} className={`stuff-carousel-slide`} style={style}>
						{ collection[i] }
					</animated.div> : null
			})
		}
	</div>;
};