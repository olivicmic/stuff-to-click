import React, { useState, useEffect } from 'react';
import { useBusy } from 'hangers';
import { useSpring, animated }  from 'react-spring';
import PlaceholderBtn from '../PlaceholderBtn';
import useResizeAware from 'react-resize-aware';
import './Accordian.scss'

export default function Accordian({ 
	children,
	className,
	expander: Expander,
	footer: Footer,
	footExpander = true,
	header: Header,
	opened = false,
	onChange = () => {},
	onClosed = () => {},
	onOpened = () => {},
	...rest
}) {
	let defaultHeight = 0;
	const [busy, statusControls] = useBusy({});
	const [expanded, toggle] = useState(opened);
	const [contentHeight, setContentHeight] = useState(defaultHeight);
	const [resizeListener, sizes] = useResizeAware();
	const expand = useSpring({
		config: { friction: 50, tension: 350 },
		from: { height: 0 },
		to: {height: expanded ? contentHeight : 0},
		...statusControls
	});

	const makeChange = () => onChange(expanded);

	const openClose = () => {
		if (expanded) document.activeElement.blur();
		toggle(!expanded);
	};

	useEffect(() => {
		if (sizes.height) setContentHeight(sizes.height);
	});

	useEffect(() => {
		if (expanded) onOpened(expanded);
		if (!expanded) onClosed(expanded);
		onChange(expanded);
	},[expanded]);

	return(
		<div className={`stuff-accordian${ className ? ' ' + className : ''}`} {...rest} >
			<header className='stuff-accordian-header' onClick={openClose}>
				{Header ? <Header /> : ''}
				{Expander ? <Expander active={expanded}/> : <PlaceholderBtn active={expanded}/>}
			</header>
			<animated.div className={`stuff-accordian${ busy ? ' accordian-busy' : ''}${ !expanded ? ' accordian-closed' : ''}`} style={expand} >
				<div className='stuff-accordian-content'>
					<hr className='stuff-accordian-seperator'/>
					{resizeListener}
					{children}
					<footer className='stuff-accordian-footer' onClick={openClose}>
						{ Footer ? <Footer /> : ''}
						{ footExpander ? 
							Expander ? <Expander active={expanded}/> : <PlaceholderBtn active={expanded}/>
						: null }
					</footer>
				</div>
			</animated.div>
		</div>
	);
};