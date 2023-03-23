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
	const [off, offSet] = useState([0,0]);
	const mainRef = useRef();
	const host = useHost({ autoBoundary, enter, exit, fixed, parent });
	const definedBounds = definedZero(autoBoundary);
	const setPos = (ax, fl = 0) => `${host.positions(ax,fl)}px`;
	const setTransform  = (step, axis)  => ((1 - step) * (overlay.phase ? 
		defined(child.exit?.[axis],0) : defined(child.enter?.[axis],0)) * (host.orientation[axis] ? -1 : 1 ));
	const idName = 'over-frame-id-' + overlay.id;
	const order = overlays.order.indexOf(overlay.id);

	if (debug) console.debug('OverFrame base debug', mapPos(host.positions, setPos).flat(), {host, off });

	useInOut({ debug, boundary: idName, disabled: !child.closeOutside, onOut: overlay.close });
	useEffect(() => {

		const xy = [host.positions(0,0) || 0,host.positions(1,0) || 0];
		const { dim, edge, mainPos } = adjustChild(mainRef?.current, child, xy, host.orientation, fixed);
		// console.log(dim);

		// console.log('🪧', {
			// xy, alignment, findEdge: findEdge(0), dim: dim[0], edge: edge[0], off: off[0], win: host.win[0]});

		const edgeCheck = ax => {
			let winDiff = edge[ax] - host.win[ax];
			// console.log('🎀',winDiff);
			// if (debug) console.debug('OverFrame edgeCheck debug', { 
			// 	dim,
			// 	offAxis: off[ax], 
			// 	childAlignment: alignment[ax], 
			// 	parentEdge: edge[ax], 
			// 	windowDimension: host.win[ax],
			// 	winDiff
			// } );
			if (off[ax] !== Math.max(winDiff,0)) {
				offSet(off.map((item,i) => i === ax ? Math.max(winDiff,0) : item ));
			}
		};
		if (debug) console.debug('OverFrame off adjust debug', {host, mainPos, xy, off, dim, edge });
		edgeCheck(0);
		edgeCheck(1, true);
	},[child, defined, debug, fixed, host, off]);

	return <animated.div {...{ 
		className: makeClasses(
			[className,['overlay-align-right',(definedBounds && off[0])]],
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
			off,
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
				// transform: `translate(-${child.alignX || 0 }%,-${child.alignY || 0}%)`
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