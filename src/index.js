import React from 'react';
import { createRoot } from 'react-dom/client';
import { configPopouts, OverLayer, Popout, useLayer, useTint } from './lib';
import { Body } from './dev';

const Smile = ({ ...rest }) => {
	return <div {...{ className: 'smile', }} ><span>:)</span></div>;
};

const Devil = ({ ...rest }) => {
	return <div {...{ className: 'smile', style: { backgroundColor: 'red' } }} ><span>>:)</span></div>;
};

const Hotdog = ({ ...rest }) => {
	return <div {...{ className: 'hotdog' }} ></div>;
};

const App = () => {
	const tint = useTint();
	const layerState = { 
		...useLayer('modals', tint, {
			hotdog: {
				autoBoundary: 16,
				component: Hotdog,
				child: { 
					alignY: 0,
					alignX: 50,
					handle: '.hotdog',
					closeOutside: true,
					enter: [500,200],
				},
			},
			devil: { 
				component: Devil,
				lockLayer: true
			},
			smile: {
				child: { 
					handle: '.smile',
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
			// debug: true,
			addConfigs: {
				jammy: {
					component: Smile,
				}
			}
		}))
	};
	const layers = [
		{ overLayerName: 'modals', type: Popout, },
		{ autoBoundary: 16, overLayerName: 'popouts', type: Popout }
	];
	return <OverLayer {...{ layers, layerState, render: Body, tint }}/>;
};

createRoot( document.getElementById('root')).render(<App />);
