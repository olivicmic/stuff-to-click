import React, { useEffect, useState } from 'react';
import { useBusy } from 'hangers';
import { useSpring, animated }  from 'react-spring';
// import { useResizeDetector } from 'react-resize-detector';
import useResizeObserver from 'use-resize-observer/polyfilled';
import './Accordian.scss'

export default function Accordian({ 
	children,
	className,
	debug,
	expander: Expander,
	footer: Footer,
	footExpander = true,
	header: Header,
	opened = false,
	onChange = () => {},
	onClosed = () => {},
	onOpened = () => {},
	title = '',
	...rest
}) {
	const [busy, statusControls] = useBusy();
	const [expanded, toggle] = useState(opened);
	const [updated, setUpdated] = useState(false);
	const [switched, setSwitched] = useState(false);
	const { height, ref } = useResizeObserver();
	const expand = useSpring({
		config: { friction: 50, tension: 350 },
		...( !expanded ? { height: 0 } : { height } ),
		...statusControls
	});

	const onClick = () => {
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
	},[expanded, onClosed, onOpened, switched]);

	const childProps = { expanded, onClick, title, ...rest };

	return <div className={`stuff-accordian${ className ? ' ' + className : ''}`}>
		<header className='stuff-accordian-header'>
			{ Header ? <Header { ...childProps} /> : '' }
		</header>
		{ children ? <animated.div {...{ className: `stuff-accordian-body${ busy ? ' accordian-busy' : ''}${ !expanded ? ' accordian-closed' : ''}`, style: expand }} >
				<div {...{ className: 'stuff-accordian-content', ref }}>
					<hr className='stuff-accordian-seperator'/>
					{ children }
					<footer className='stuff-accordian-footer'>
						{ Footer ? <Footer { ...childProps }  /> : '' }
					</footer>
				</div>
			</animated.div> : null }
	</div>;
};