import React from 'react';
import Option  from '../Option';

export default function Picker({ busy, onFocus, overlay, mainRef, options = [], style, submit, top, ...rest }) {
	const click = value => {
		onFocus();
		submit({ target: { selectID: overlay.id, value } });
	}; 
	return <ul className='stuff-faux-select-list' { ...{ hostid: overlay.id, onFocus, tabIndex: -1, ref: mainRef,  style }}>
		{ options.length && options.map((item, key) => 
			<Option { ...{ item, key, position: key, click, overlay, ...rest } }/>) }
	</ul>;
};