import React, { useState, useEffect, useRef } from 'react';
import { useSpring, animated }  from 'react-spring';
import PlaceholderBtn from '../PlaceholderBtn';
import './Accordian.scss'

export default function Accordian({ children, expander: Expander, footer: Footer, header: Header, opened = false }) {
	let defaultHeight = 0;
	const [expanded, toggle] = useState(opened);
	const [contentHeight, setContentHeight] = useState(defaultHeight);
	const contentRef = useRef(null);
	const expand = useSpring({
		config: { friction: 50, tension: 350 },
		height: expanded ? `${contentHeight}px` : `${defaultHeight}px`
	});

	const openClose = () => toggle(!expanded);
	const switchProps = {
		active: expanded,
		onClick: openClose
	};

	useEffect(() => {
		setContentHeight(contentRef.current.scrollHeight); //Sets initial height	
		window.addEventListener("resize", setContentHeight(contentRef.current.scrollHeight)); //Adds resize event listener
		return window.removeEventListener("resize", setContentHeight(contentRef.current.scrollHeight)); // Clean-up
	}, [contentRef]);

	return(
		<div className='stuff-accordian-container' >
			<header>
				{Header ? <Header /> : ''}
				{Expander ? <Expander {...switchProps} /> : <PlaceholderBtn {...switchProps} />}
			</header>
			<animated.div className='stuff-accordian' style={expand}>
				<div className='stuff-accordian-content' ref={contentRef}>
					<hr />
					{children}
					<footer>
						{Footer ? <Footer /> : ''}
						{Expander ? <Expander {...switchProps} /> : <PlaceholderBtn {...switchProps} />}
					</footer>
				</div>
			</animated.div>
		</div>
	);
};