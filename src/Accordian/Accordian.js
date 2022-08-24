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
	headerStyle,
	opened = false,
	onChange = () => {},
	onClosed = () => {},
	onOpened = () => {},
	toggle = () => {},
	...rest
}) {
	let defaultHeight = 0;
	const [busy, statusControls] = useBusy({});
	//const [expanded, toggle] = useState(opened);
	const [contentHeight, setContentHeight] = useState(defaultHeight);
	const [resizeListener, sizes] = useResizeAware();
	const expand = useSpring({
		config: { friction: 50, tension: 350 },
		from: { height: 0 },
		to: {height: opened ? contentHeight : 0},
		...statusControls
	});

	const makeChange = () => onChange(opened);

	const openClose = () => {
		if (opened) document.activeElement.blur();
		toggle(!opened);
	};

	useEffect(() => {
		if (sizes.height) setContentHeight(sizes.height);
	});

	useEffect(() => {
		if (opened) onOpened(opened);
		if (!opened) onClosed(opened);
		onChange(opened);
	},[opened]);

	return(
		<div className={`stuff-accordian${ className ? ' ' + className : ''}`} {...rest} >
			<header className='stuff-accordian-header' onClick={openClose} style={headerStyle}>
				{Header ? <Header /> : ''}
				{Expander ? <Expander active={opened}/> : <PlaceholderBtn active={opened}/>}
			</header>
			<animated.div className={`stuff-accordian-body${ busy ? ' accordian-busy' : ''}${ !opened ? ' accordian-closed' : ''}`} style={expand} >
				<div className='stuff-accordian-content'>
					<hr className='stuff-accordian-seperator'/>
					{resizeListener}
					{children || null}
					<footer className='stuff-accordian-footer' onClick={openClose}>
						{ Footer ? <Footer /> : ''}
						{ footExpander ? 
							Expander ? <Expander active={opened}/> : <PlaceholderBtn active={opened}/>
						: null }
					</footer>
				</div>
			</animated.div>
		</div>
	);
};