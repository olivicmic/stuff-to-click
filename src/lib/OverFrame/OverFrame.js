import React, { useEffect, useRef, useState } from 'react';
import { animated } from 'react-spring';
import { useInOut } from 'hangers';
import { is, makeClasses } from 'lal';
import { useHost } from '../hooks';
import { adjustChild, invert } from '../utilities';
import DragLayer from '../DragLayer';
import mapPos from './mapPos';

export default function OverFrame({ autoBoundary, child = {}, className, debug, enter, exit, fixed, overlay, overlays, parent, popoutStyle, priority, style, type: Type, zBase = 0, ...rest }) {
	const { definedZero, defined } = is;
	const [offNW, offNWSet] = useState([0,0]);
	const [offSE, offSESet] = useState([0,0]);
	const [winScroll] = useState(window.scrollY);
	const mainRef = useRef();
	const host = useHost({ autoBoundary, enter, exit, fixed, parent });
	const definedBounds = definedZero(autoBoundary);

	const setPos = (ax, fl = 0) => `${host.positions(ax,fl) + ((!fixed && ax && fl) ? (document.body.offsetHeight - window.innerHeight - winScroll) : 0  )}px`;

	const setTransform  = (step, axis)  => ((1 - step) * (overlay.phase ? 
		defined(child.exit?.[axis],0) : defined(child.enter?.[axis],0)) * (host.orientation[axis] ? -1 : 1 ));
	const idName = 'over-frame-id-' + overlay.id;
	const order = overlays.order.indexOf(overlay.id);

	if (debug) console.debug('OverFrame base debug', mapPos(host.positions, setPos).flat(), {host, offSE });

	useInOut({ debug, boundary: idName, disabled: !child.closeOutside, onOut: overlay.close });
	useEffect(() => {
		const xy = [host.positions(0,0) || 0,host.positions(1,0) || 0];
		const { dim, edge, edgeNW, mainPos } = adjustChild(mainRef?.current, child, xy, host.orientation, fixed);

		const edgeCheck = ax => {
			let winDiff = edge[ax] - host.win[ax];
			let diffSW = Math.max(winDiff,0);
			let diffNW = -Math.min(edgeNW[ax],0);
			if (offSE[ax] !== diffSW) {
				offSESet(offSE.map((item,i) => i === ax ? diffSW : item ));
			}
			if (offNW[ax] !== diffNW) {
				offNWSet(offNW.map((item,i) => i === ax ? diffNW : item ))
			}
		};
		if (debug) console.debug('OverFrame off adjust debug', {host, mainPos, xy, offSE, dim, edge });
		edgeCheck(0);
		edgeCheck(1, true);
	},[child, defined, debug, fixed, host, offSE, offNW]);

	return <animated.div {...{ 
		className: makeClasses(
			[className,['overlay-align-right',(definedBounds && offSE[0])]],
			'',
			'stuff-overlay'),
		id: idName,
		onMouseDown: e => overlay.elevate(e),
		style: {
			...style,
			height: fixed ? '100vh' : '100%',
			width: fixed ? '100vw' : '100%',
			position: fixed ? 'fixed' : 'absolute', 
			transform: style.opacity.to(o => `translate(${ setTransform(o,0) }px, ${ setTransform(o,1) }px)`),
			zIndex: overlays.layerLock && overlays.layerLock !== overlay.id && !priority ? 
				-(overlays.items.length - order) : zBase + order
		} 
	}}>
		<DragLayer {...{ 
			child,
			debug,
			definedBounds,
			fixed,
			host,
			offNW,
			offSE,
			mainRef,
			popoutStyle,
			style: {
				...child.fitToParentX && { width: host.size[0] },
				...parent && {
					...!child.centerX && !host.orientation[0] && { left: setPos(0,0) },
					...!child.centerX && host.orientation[0] && { right: setPos(0,1) },
					...!child.centerY && !host.orientation[1] && { top: setPos(1,0) },
					...!child.centerY && host.orientation[1] && { bottom: setPos(1,1)}
				},
			},
			...(child.alignX || child.alignY)  &&  {
				transform: `translate(${invert(child.alignX, host.orientation[0])}%,${invert(child.alignY, host.orientation[1])}%)`
			},
		}}>
			<Type { ...{ 
				...rest,
				child,
				debug,
				overlay,
				overlays
			}}/>
		</DragLayer>	
	</animated.div>
};