import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useSpring, animated }  from 'react-spring';
import PlaceholderBtn from '../PlaceholderBtn';
import { useResizeDetector } from 'react-resize-detector';
import useResizeAware from 'react-resize-aware';
import useHeight  from '../useHeight';
import './Accordian.scss'

export default function Accordian({ children, expander: Expander, footer: Footer, header: Header, opened = false, onChange = () => {} }) {
	let defaultHeight = 0;
	const [expanded, toggle] = useState(opened);
	const [contentHeight, setContentHeight] = useState(defaultHeight);
	const [resizeListener, sizes] = useResizeAware();
	const expand = useSpring({
		config: { friction: 50, tension: 350 },
		from: { height: 0 },
		to: {height: expanded ? contentHeight : 0}
	});

	const makeChange = () => onChange(expanded);

	const openClose = () => {
		if (expanded) document.activeElement.blur();
		toggle(!expanded);
	};

	useEffect(() => {
		if (sizes.height) setContentHeight(sizes.height);
	});

	useEffect(() => makeChange(),[expanded]);

	return(
		<div className='stuff-accordian-container' >
			<header className='stuff-accordian-header' onClick={openClose}>
				{Header ? <Header /> : ''}
				{Expander ? <Expander active={expanded}/> : <PlaceholderBtn active={expanded}/>}
			</header>
			<animated.div className='stuff-accordian' style={expand} >
				<div className='stuff-accordian-content'>
					<hr className='stuff-accordian-seperator'/>
					{resizeListener}
					{children}
					<footer className='stuff-accordian-footer' onClick={openClose}>
						{Footer ? <Footer /> : ''}
						{Expander ? <Expander active={expanded}/> : <PlaceholderBtn active={expanded}/>}
					</footer>
				</div>
			</animated.div>
		</div>
	);
};