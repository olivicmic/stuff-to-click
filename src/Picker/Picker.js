import React from 'react';
import Option  from '../Option';

export default function Picker({ index, set, modState, onFocus, position, value, submit, setMod, setKill, ...rest }) {
	console.log(setMod, modState, index);
	const list = set.map((item, key) => <Option { ...{ index: modState[position] || {}, item, key, position: key,  onFocus, value, submit: i => {
			setMod([ ...modState ]).filter((mod, n) => n === position ? { ...mod, ...( item || {} ), index: i } : mod);
	}  } }/>);
	return <ul tabIndex='-1' className='stuff-faux-select-list'>{ list || null }</ul>;
};