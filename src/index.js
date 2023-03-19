import React from 'react';
import { createRoot } from 'react-dom/client';
import { configPopouts, OverLayer, Popout, useLayer, useTint } from './lib';
import { Body } from './dev';

const Smile = ({ mainRef, style, ...rest }) => {
	return <div {...{ className: 'smile', style, ref: mainRef }} ><span>:)</span></div>;
};

const Devil = ({ mainRef, style, ...rest }) => {
	return <div {...{ className: 'smile', ref: mainRef, style: { ...style, backgroundColor: 'red' } }} ><span>>:)</span></div>;
};

const App = () => {
	const tint = useTint();
	const layerState = { 
		...useLayer('modals', tint, {
			devil: { 
				component: Devil,
				lockLayer: true
			},
			smile: {
				child: { 
					enter: [500,200],
					alignX: 50,
					alignY: 50, 
					// closeOutside: true 
				},
				component: Smile,
				initial: {bootY: true},
				modifyOpen: h => { console.log('🦋', h); return h },
				// lockLayer: true,
				onOpened: e => console.log('preset onOpened',e),
				parent: { alignX: 50, alignY: 50 }
			}
		}),
		...useLayer('popouts', tint, configPopouts({
			addConfigs: {
				jammy: {
					component: Smile,
				}
			}
		}))
	};
	const layers = [
		{ overLayerName: 'modals', type: Popout },
		{ overLayerName: 'popouts', type: Popout }
	];
	return <OverLayer {...{ layers, layerState, render: Body, tint }}/>;
};

createRoot( document.getElementById('root')).render(<App />);
