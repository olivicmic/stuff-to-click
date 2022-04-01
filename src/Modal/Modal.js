import React, { useEffect, useState } from 'react';
import { useStateRef } from 'hangers';
import { animated } from 'react-spring';

export default function Modal({ component: Component, fade = 0, modID, modState, opacity, position, springRef, host, ...rest }) {
	const [rendered, setRendered] = useState(false);
	const [offPage, setOffpage] = useState();
	const [ref, setRef] = useStateRef();
	const comp = ref?.getBoundingClientRect() || { bottom: 0, height: 0 };
	const margin = host.font / 2;
	const compTomp = [host.y + host.height + margin, host.y - comp.height - margin ];
	const at = compTomp[offPage?.[0] || 0];
	const center = host.y + (host.height / 2);
	const travel = compTomp[0] - center;
	const inOut = [-travel, travel][offPage?.[0] || 0];

	useEffect(() => {
		if (!rendered) setRendered(true);
		else if (!offPage)  {
			setOffpage([ comp.bottom > window.innerHeight ? 1 : 0 ]);
		}
	},[rendered, comp, offPage]);
	return <animated.div className={`stuff-modal${ modID ? ' modalID-' + modID : '' }`} style={{ 
		opacity: opacity.to(y => Math.max(y,fade)),
		transform: opacity.to(y => `translate(0px, ${(1 - y) * inOut}px)`),
		top: `${ at }px`, 
		left: `${ host.x }px` 
	}}>
		<Component { ...{ ...rest, modID, position, setRef, state: modState[position], }} />
	</animated.div>;
};