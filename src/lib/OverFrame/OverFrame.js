import React, { useEffect, useRef, useState } from 'react';
import { animated } from 'react-spring';
import { useInOut } from 'hangers';
import { is, makeClasses } from 'lal';
import { useHost } from '../hooks';

export default function OverFrame({ autoBoundary, className, config, debug, enter, exit, overlay, style, type: Type, zBase = 0, ...rest }) {
	const { definedZero, defined } = is;
	const [rendered, setRendered] = useState(false);
	const [off, offSet] = useState([0,0]);
	const mainRef = useRef();
	const main = [mainRef?.current?.clientWidth || 0, mainRef?.current?.clientHeight || 0];
	const host = useHost({ config, enter, exit });
	const centerX = config?.centerX;
	const definedBounds = definedZero(autoBoundary);
	const height = defined(main[1],0);
	const width = defined(main[0],0);
	const orientation = (ax, fl) => !fl ? 
		host.xy[ax] + (host.corner[ax] ? host.size[ax] : 0) + host.gap[ax] :
		host.win[ax] - (host.xy[ax] + (host.corner[ax] ? 0 : host.size[ax]) - host.gap[ax]);
	const setPos = (ax, fl = 0) => `${(orientation(ax,fl) || 0) - off[ax] + host.gap[ax]}px`;
	const setTransform  = (step, axis)  => ((1 - step) * (overlay.phase ? 
		defined(host.exit[axis]) : defined(host.enter[axis])) * (host.orientation[axis] ? -1 : 1 ));
	const idName = 'over-frame-id-' + overlay.id;

	useInOut({ debug: true, boundary: idName, disabled: !config?.closeOutside, onOut: overlay.close });
	useEffect(() => {
		let edge = [host.xy[0] + host.size[0] + width, host.xy[1] + host.size[1] + height];

		const edgeCheck = (ax, dbg) => {
			let winDiff = edge[ax] - host.orientation[ax] ? 0 : host.win[ax];
			if (off[ax] !== Math.max(winDiff,0)) {
				offSet(off.map((item,i) => i === ax ? Math.max(winDiff,0) : item ));
			}
		};
		if (!rendered) { setRendered(true); }
		edgeCheck(0);
		edgeCheck(1, true);
	},[rendered, debug, height, host, off, width]);

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
			zIndex: overlay.isTop ? zBase + 1 : zBase
		} 
	}}>
		<Type { ...{ 
			...rest,
			debug,
			overlay,
			mainRef,
			style: {
				...config && {
					...!centerX && !host.orientation[0] && { left: setPos(0,0) },
					...!host.orientation[1] && { top: setPos(1,0) },
					...!centerX && host.orientation[0] && { right: setPos(0,1) },
					...host.orientation[1] && { bottom: setPos(1,1)}
				}
			}
		}}/>
	</animated.div>
};