import React from 'react';
import Option  from '../Option';

export default function Picker({ overlayID: hostid, onFocus, position, setRef, state, updateOverlay, ...rest }) {
	const click = i => {
		onFocus();
		state.submit(i);
		updateOverlay(i, state.set[i]);
	}; 
	const list = state ? state.set.map((item, key) => <Option { ...{ item, key, position: key, click, ...state } }/>) : null;
	return <ul className='stuff-faux-select-list' { ...{ hostid, onFocus, tabIndex: -1, ref: setRef }}>
		{ list || null }
	</ul>;
};