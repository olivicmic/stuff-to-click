import React, { useEffect, useRef, useState } from 'react';
import { animated } from 'react-spring';
import { useInOut } from 'hangers';
import { is, makeClasses } from 'lal';
import { useHost } from '../hooks';

export default function OverFrame({ autoBoundary, child, className, debug, enter, exit, overlay, overlays, parent, style, type: Type, zBase = 0, ...rest }) {
	const { definedZero, defined } = is;
	const [off, offSet] = useState([0,0]);
	const mainRef = useRef();
	const host = useHost({ enter, exit, parent });
	const definedBounds = definedZero(autoBoundary);
	const hostAlign = ax => host.size[ax] * (.01 * host.alignment[ax]);
	const orientation = (ax, fl) => !fl ? 
		host.xy[ax] + hostAlign(ax) + host.gap[ax] :
		host.win[ax] - (host.xy[ax] + (host.size[ax] - hostAlign(ax)) - host.gap[ax]);
	const setPos = (ax, fl = 0) => `${(orientation(ax,fl) || 0) - off[ax] + host.gap[ax]}px`;
	const setTransform  = (step, axis)  => ((1 - step) * (overlay.phase ? 
		defined(child?.exit?.[axis],[0,0]) : defined(child?.enter?.[axis],[0,0])) * (host.orientation[axis] ? -1 : 1 ));
	const idName = 'over-frame-id-' + overlay.id;

	useInOut({ debug: true, boundary: idName, disabled: !child?.closeOutside, onOut: overlay.close });
	useEffect(() => {
		const main = [mainRef?.current?.clientWidth || 0, mainRef?.current?.clientHeight || 0];
		const dim = [defined(main[0],0),defined(main[1],0)]
		const edge = [host.xy[0] + host.size[0] + dim[0], host.xy[1] + host.size[1] + dim[1]];
		const edgeCheck = (ax, dbg) => {
			let winDiff = edge[ax] - host.orientation[ax] ? 0 : host.win[ax];
			if (off[ax] !== Math.max(winDiff,0)) {
				offSet(off.map((item,i) => i === ax ? Math.max(winDiff,0) : item ));
			}
		};
		edgeCheck(0);
		edgeCheck(1, true);
	},[defined, debug, host, off]);

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
					transform: `translate(-${child.alignX || 0}%,-${child.alignY || 0}%)`
				},
			}
		}}/>
	</animated.div>
};