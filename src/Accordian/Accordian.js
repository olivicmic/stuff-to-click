import React, { useState, useEffect } from 'react';
import { useBusy } from 'hangers';
import { useSpring, animated }  from 'react-spring';
import PlaceholderBtn from '../PlaceholderBtn';
import useResizeAware from 'react-resize-aware';
import './Accordian.scss'

export default function Accordian({ 
	children,
	className,
	debug = false,
	expander: Expander,
	footer: Footer,
	footExpander = true,
	header: Header,
	headerStyle,
	opened = false,
	onChange = () => {},
	onClosed = () => {},
	onOpened = () => {},
	...rest
}) {
	let defaultHeight = 0;
	const [busy, statusControls] = useBusy({});
	const [expanded, toggle] = useState(opened);
	const [updated, setUpdated] = useState(false);
	const [switched, setSwitched] = useState(false);
	const [height, setHeight] = useState(defaultHeight);
	const [rendered, setRendered] = useState(false);
	const [resizeListener, sizes] = useResizeAware();
	const makeHeight = () => {
		if (!expanded) return { height: 0 };
		else {
			if (updated) return { height };
			return {};
		}
	};
	const expand = useSpring({
		config: { friction: 50, tension: 350 },
		...( !expanded ? { height: 0 } : updated ? { height } : {} : {} ),
		...statusControls
	});

	const makeChange = () => onChange(expanded);

	const openClose = () => {
		setUpdated(true);
		setSwitched(true);
		onChange(expanded);
	};

	if (debug) console.log('accordian debug',{ opened, expanded, updated, switched });

	useEffect(() => {
		if (switched && expanded) {
			setSwitched(false);
			toggle(false);
			onOpened(false);
			document.activeElement.blur();
		}
		if (switched && !expanded) {
			setSwitched(false);
			toggle(true);
			onClosed(true);
		};
	},[switched, expanded]);

	useEffect(() => {
		setRendered(true);
		if (rendered && sizes.height) setHeight(sizes.height);
		return () => setRendered(false);
	},[sizes, rendered, setRendered]);


	return<div className={`stuff-accordian${ className ? ' ' + className : ''}`} {...rest}>
		<header className='stuff-accordian-header' onClick={openClose} style={headerStyle}>
			{ Header ? <Header /> : '' }
			{ Expander ? <Expander active={expanded}/> : <PlaceholderBtn active={expanded}/> }
		</header>
		{ children ? <animated.div className={`stuff-accordian-body${ busy ? ' accordian-busy' : ''}${ !expanded ? ' accordian-closed' : ''}`} style={expand} >
				<div className='stuff-accordian-content'>
					<hr className='stuff-accordian-seperator'/>
					{ resizeListener }
					{ rendered ? children : null }
					<footer className='stuff-accordian-footer' onClick={openClose}>
						{ Footer ? <Footer /> : ''}
						{ footExpander ? 
							Expander ? <Expander active={expanded}/> : <PlaceholderBtn active={expanded}/>
						: null }
					</footer>
				</div>
			</animated.div> : null }
	</div>;
};