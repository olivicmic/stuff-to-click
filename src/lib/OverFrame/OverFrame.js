import React, { useEffect, useRef, useState } from 'react';
import { animated } from 'react-spring';
import { useInOut } from 'hangers';
import { is, makeClasses } from 'lal';
import { useHost } from '../hooks';

export default function OverFrame({ autoBoundary, child, className, debug, enter, exit, overlay, overlays, parent, style, type: Type, zBase = 0, ...rest }) {
	const { definedZero, defined } = is;
	const [off, offSet] = useState([0,0]);
	const mainRef = useRef();
	const host = useHost({ autoBoundary, enter, exit, parent });
	const definedBounds = definedZero(autoBoundary);
	const setPos = (ax, fl = 0) => `${(host.positions(ax,fl) || 0) + off[ax]}px`;
	const setTransform  = (step, axis)  => ((1 - step) * (overlay.phase ? 
		defined(child?.exit?.[axis],0) : defined(child?.enter?.[axis],0)) * (host.orientation[axis] ? -1 : 1 ));
	const idName = 'over-frame-id-' + overlay.id;

	useInOut({ debug, boundary: idName, disabled: !child?.closeOutside, onOut: overlay.close });
	useEffect(() => {
		const dim = [mainRef?.current?.clientWidth || 0, mainRef?.current?.clientHeight || 0];
		const mainPos = [mainRef?.current?.offsetLeft || 0, mainRef?.current?.offsetTop || 0];
		const alignment = [child?.alignX || 0, child?.alignY || 0 ];
		const alignPos = ax => (mainPos[ax] - ( dim[ax] * ( .01 * alignment[ax] ))) || 0;
		const xy = [host.positions(0,0),host.positions(1,0)];
		const edge = [alignPos(0) + dim[0], alignPos(1) + dim[1]];
		const edgeCheck = ax => {
			let winDiff = edge[ax] - host.win[ax];
			if (debug) console.debug('OverFrame debug', { 
				offAxis: off[ax], 
				childAlignment: alignment[ax], 
				anchorEdge: edge[ax], 
				windowDimension: host.win[ax],
				winDiff
			} );
			if (off[ax] !== Math.max(winDiff,0)) {
				offSet(off.map((item,i) => i === ax ? Math.max(winDiff,0) : item ));
			}
		};
		edgeCheck(0);
		edgeCheck(1, true);
		if (debug) console.debug('OverFrame debug', host.positions(0,1), {host, mainPos, xy, off, dim, edge });
	},[child, defined, debug, host, off]);

	return <animated.div {...{ 
		className: makeClasses([className,[
			'overlay-align-right',(definedBounds && off[0])
			]],
			'',
			'stuff-overlay'),
		id: idName,
		onMouseDown: e => overlay.elevate(e),
		style: {
			...style,
			transform: style.opacity.to(o => `translate(${ setTransform(o,0) }px, ${ setTransform(o,1) }px)`),
			zIndex: zBase + overlays.order.indexOf(overlay.id)
		} 
	}}>
		<Type { ...{ 
			...rest,
			debug,
			overlay,
			overlays,
			mainRef,
			style: {
				...parent && {
					...!child?.centerX && !host.orientation[0] && { left: setPos(0,0) },
					...!child?.centerY && !host.orientation[1] && { top: setPos(1,0) },
					...!child?.centerX && host.orientation[0] && { right: setPos(0,1) },
					...!child?.centerY && host.orientation[1] && { bottom: setPos(1,1)}
				},
				...(child?.alignX || child?.alignY)  &&  {
					transform: `translate(-${child.alignX || 0 }%,-${child.alignY || 0}%)`
				},
			}
		}}/>
	</animated.div>
};