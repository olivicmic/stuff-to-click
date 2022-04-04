import React, { useEffect, useState } from 'react';
import { useStateRef } from 'hangers';
import { animated } from 'react-spring';

export default function Overlay({ component: Component, fade = 0, overlayID, overState, opacity, position, springRef, host, ...rest }) {
	const [rendered, setRendered] = useState(false);
	const [offPage, setOffpage] = useState();
	const [ref, overlayRef] = useStateRef();
	const comp = ref?.getBoundingClientRect() || { bottom: 0, height: 0 };
	const gap = host.gap;
	const compTomp = [host.y + host.height + gap, host.y - comp.height - gap ];
	const at = compTomp[offPage?.[0] || 0];
	const inOut = [-gap, gap][offPage?.[0] || 0];

	useEffect(() => {
		if (!rendered) setRendered(true);
		else if (!offPage)  {
			setOffpage([ comp.bottom > window.innerHeight ? 1 : 0 ]);
		}
	},[rendered, comp, offPage]);
	return <animated.div className={`stuff-overlay${ overlayID ? ' modalID-' + overlayID : '' }`} style={{
		opacity: opacity.to(y => Math.max(y,fade)),
		transform: opacity.to(y => `translate(0px, ${(1 - y) * inOut}px)`),
		top: `${ at }px`, 
		left: `${ host.x }px` 
	}}>
		<Component { ...{ ...rest, opacity, overlayID, position, overlayRef, overlay: overState[position], }} />
	</animated.div>;
};