import React, { useEffect } from 'react';
import { useBusy } from 'hangers';
import { useTransition } from 'react-spring';
import { OverFrame } from '..';

export default function OverModule({ busy, debug, overlayerBusy, overLayerName, moduleRef, overlays, tinted, tintedSet = () => {}, ...rest }) {
	const [moduleBusy, setBusy] = useBusy({ onRest: overlays.clean });
	const overlayTransitions = useTransition(overlays.items, {
		config: ({ child }) => child.spring || { tension: 150, friction: 14 },
		from: { opacity: 0 },
		enter: { opacity: 1 },
		leave: { opacity: 0 },
		ref: moduleRef,
			...setBusy,
	});
	
	const overlaysProps = ({ overlayID, ...overlayState }) => {
		return {
			overlay: {
				busy: overlayerBusy || moduleBusy,
				close: () => overlays.remove(overlayID),
				elevate: e => overlays.currentSet(overlayID),
				id: overlayID,
				isTop: overlays.top === overlayID,
				phase: overlays.completed.indexOf(overlayID) > -1 ? 1 : 0,
			},
			...overlays.data[overlayID],
			...overlayState
		};
	}

	useEffect(() => {
		if (!tinted.find(t => t === overLayerName) && overlays.tint && !!overlays.items.length ) {
			tintedSet([ ...tinted, overLayerName ]);
		}
		else if (tinted.indexOf(overLayerName) > -1 && !overlays.items.length) tintedSet([]);
	},[overLayerName, overlays, tinted, tintedSet]);

	return overlayTransitions((style, overlay) => 
		<OverFrame {...{ debug, overlays, style, ...overlaysProps(overlay), ...rest }}/>);
};