import React from 'react';
import { animated, easings, useChain, useTransition, useSpringRef } from 'react-spring';
import { useBusy } from 'hangers';
import { OverlayContext, OverModule } from '..';
import './OverLayer.scss'

export default function OverLayer({ layers = [], layerState, render: Render, renderProps, tint = {}, tintStyle, zBase = 1000, ...rest }) {
	const [overlayerBusy, overlayerBusySet] = useBusy();
	const tintRef = useSpringRef();
	const moduleRef = useSpringRef();
	const tintTransition = useTransition(tint.active, {
		config: {
			easing: tint.active ? easings.easeOutQuad : easings.easeInQuad,
			duration: 175
		},
		from: { opacity: 0 },
		enter: { opacity: 1 },
		leave: { opacity: 0 },
		ref: tintRef,
		...overlayerBusySet
	});

	useChain([tintRef, moduleRef], tint.active ? [0,.25] : [0,0] );

	return <OverlayContext.Provider value={layerState}>
		<Render { ...{ ...renderProps, ...tint.style && { style: tint.style } } }/>
		<div {...{ 
			className: `stuff-overlays${ tint.active ? ' stuff-over-active' : '' }`, 
			style: { ...tint.style, zIndex: zBase }
		}}>
			{ tintTransition((tinter, shade) => 
				shade && <animated.div {...{ className: 'stuff-tint', style: { ...tinter, ...tintStyle} }} />) }
			{ layers.map(({ overLayerName, ...layer }, key ) => 
				<OverModule { ...{ ...layer, className: `overlay-${overLayerName}`, key, moduleRef, overlayerBusy, overlays: layerState[overLayerName], tint, zBase: zBase * (1 + key) }}/>
			) }
		</div>
	</OverlayContext.Provider>;
};