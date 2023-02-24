import React, { useState } from 'react';
import { animated, easings, useChain, useTransition, useSpringRef } from 'react-spring';
import { useBusy } from 'hangers';
import { OverlayContext, OverModule } from '..';
import './OverLayer.scss'

export default function OverLayer({ layers = [], layerState, render: Render, renderProps, tintStyle, zBase = 1000, ...rest }) {
	const [tinted, tintedSet] = useState([]);
	const [overlayerBusy, overlayerBusySet] = useBusy();
	const isTinted = !!tinted.length;
	const tintRef = useSpringRef();
	const moduleRef = useSpringRef();
	const tintTransition = useTransition(isTinted, {
		config: {
			easing: isTinted ? easings.easeOutQuad : easings.easeInQuad,
			duration: 175
		},
		from: { opacity: 0 },
		enter: { opacity: 1 },
		leave: { opacity: 0 },
		ref: tintRef,
		...overlayerBusySet
	});

	useChain([tintRef, moduleRef], isTinted ? [0,.25] : [0,0] );

	return <OverlayContext.Provider value={layerState}>
		<Render { ...{ ...renderProps, modalActive: isTinted } }/>
		<div {...{ className: `stuff-overlays${ isTinted ? ' stuff-over-active' : '' }`, style: { zIndex: zBase } }}>
			{ tintTransition((tinter, shade) => 
				shade && <animated.div {...{ className: 'stuff-tint', style: { ...tinter, ...tintStyle} }} />) }
			{ layers.map(({ overLayerName, ...layer }, key ) => 
				<OverModule { ...{ ...layer, className: `overlay-${overLayerName}`, key, moduleRef, overlayerBusy, overLayerName, overlays: layerState[overLayerName], tinted, tintedSet, zBase: zBase * (1 + key) }}/>
			) }
		</div>
	</OverlayContext.Provider>;
};