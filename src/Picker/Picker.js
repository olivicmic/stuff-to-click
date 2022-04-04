import React from 'react';
import Option  from '../Option';

export default function Picker({ busy, overlayID: hostid, onFocus, overlay, overlayRef, updateOverlay, ...rest }) {
	const click = i => {
		onFocus();
		overlay.submit(i);
		updateOverlay(i, overlay.set[i]);
	}; 
	const list = overlay ? overlay.set.map((item, key) => <Option { ...{ busy, item, key, position: key, click, ...overlay } }/>) : null;
	return <ul className='stuff-faux-select-list' { ...{ hostid, onFocus, tabIndex: -1, ref: overlayRef }}>
		{ list || null }
	</ul>;
};