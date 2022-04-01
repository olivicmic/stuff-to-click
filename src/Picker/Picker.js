import React from 'react';
import Option  from '../Option';

export default function Picker({ modID: hostid, onFocus, position, setRef, state, updateModal, ...rest }) {
	const click = i => {
		onFocus();
		state.submit(i);
		updateModal(i, state.set[i]);
	}; 
	const list = state ? state.set.map((item, key) => <Option { ...{ item, key, position: key, click, ...state } }/>) : null;
	return <ul className='stuff-faux-select-list' { ...{ hostid, onFocus, tabIndex: -1, ref: setRef }}>
		{ list || null }
	</ul>;
};