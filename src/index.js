import React from 'react';
import { createRoot } from 'react-dom/client';
import { configPopouts, OverLayer, Picker, useOverlays } from './lib';
import { Body } from './dev';

const Smile = ({ mainRef, style, ...rest }) => {
	return <div {...{ className: 'smile', style, ref: mainRef }} ><span>:)</span></div>;
};

const App = () => {
	const layerState = { 
		modals: useOverlays({ smile: {
			child: { enter: [500,200], alignX: 50, alignY: 50, closeOutside: true },
			initial: {bootY: true},
			lockLayer: true,
			onOpened: e => console.log('preset onOpened',e),
			parent: { alignX: 50, alignY: 50 }
		}}),
		popout: useOverlays(configPopouts)
	};
	const layers = [
		{ overLayerName: 'modals', type: Smile },
		{ overLayerName: 'popout', type: Picker }
	];
	return <OverLayer {...{ layers, layerState, render: Body }}/>;
};

createRoot( document.getElementById('root')).render(<App />);
