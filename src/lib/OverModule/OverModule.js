import React from 'react';
import { useBusy } from 'hangers';
import { useTransition } from 'react-spring';
import { OverFrame } from '..';

export default function OverModule({ busy, debug, overlayerBusy, moduleRef, overlays, ...rest }) {
	const [moduleBusy, setBusy] = useBusy({
		onRest: overlays.clean
	});
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

	return overlayTransitions((style, overlay) => 
		<OverFrame {...{ debug, overlays, style, ...overlaysProps(overlay), ...rest }}/>);
};