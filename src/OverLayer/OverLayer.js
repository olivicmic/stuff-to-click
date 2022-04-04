import React, { useEffect  } from 'react';
import { useTransition, easings, config } from 'react-spring';
import { useBusy } from 'hangers';
import { OverlayContext } from '../Context';
import { useActiveElement } from '../hooks';
import Overlay from '../Overlay';
import useOverlays from './useOverlays';
import './OverLayer.scss'


export default function OverLayer({ children }) {
	const { overlays, ...rest  } = useOverlays();
	const [busy, setBusy] = useBusy({});
	  const transitions = useTransition(overlays, {
		//config: config.stiff,
	  	config: { easing: easings.easeInOutQuad, duration: 250 },
		from: { opacity: 0 },
		enter: { opacity: 1 },
		leave: { opacity: 0 },
		...setBusy,
	});
 /*
	    const focusedElement = useActiveElement();
 
	useEffect(() => {
		if (focusedElement) {
			focusedElement.value && console.log('🍔 Active element', focusedElement.value);
		}
		console.log(focusedElement);
	}, [focusedElement]);
*/
	return <OverlayContext.Provider value={{ overlays, ...rest }}>
		{ children }
		<div className='stuff-overlays'>
			{ transitions(({ opacity }, overlay) => <Overlay{ ...{
			...overlay,
			busy,
			overlays,
			opacity,
			...rest
		} }/> ) }
		</div>
	</OverlayContext.Provider>;
};