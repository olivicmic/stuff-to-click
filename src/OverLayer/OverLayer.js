import React, { useEffect  } from 'react';
import { useTransition, easings, config } from 'react-spring';
import { useBusy } from 'hangers';
import { useActiveElement } from '../hooks';
import Overlay from '../Overlay';
import OverlayContext from '../OverlayContext';
import useOverlays from './useOverlays';
import './OverLayer.scss'


export default function OverLayer({ children }) {
	const overlays = useOverlays();
	const [busy, setBusy] = useBusy({});
	  const transitions = useTransition(overlays.items, {
		//config: config.stiff,
	  	config: { easing: easings.easeInOutQuad, duration: 250 },
		from: { opacity: 0 },
		enter: { opacity: 1 },
		leave: { opacity: 0 },
		...setBusy,
	});

	return <OverlayContext.Provider value={{ overlays }}>
		{ children }
		<div className='stuff-overlays'>
			{ transitions(({ opacity }, overlay) => <Overlay{ ...{
			...overlay,
			busy,
			opacity,
			...overlays
		} }/> ) }
		</div>
	</OverlayContext.Provider>;
};