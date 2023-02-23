import React from 'react';
import Option  from '../Option';

export default function Picker({ busy, left, onFocus, overlay, mainRef, set = [], style, submit, top, ...rest }) {
	const click = i => {
		onFocus();
		submit({ target: { name: overlay.id, value: i} });
	}; 
	return <ul className='stuff-faux-select-list' { ...{ hostid: overlay.id, onFocus, tabIndex: -1, ref: mainRef,  style }}>
		{ set.length && set.map((item, key) => 
			<Option { ...{ busy, item, key, position: key, click, overlay } }/>) }
	</ul>;
};