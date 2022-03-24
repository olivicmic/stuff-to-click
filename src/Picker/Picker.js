import React from 'react';
import Option  from '../Option';

export default function Picker({ index, set, modState, onFocus, position, value, submit, setMod, ...rest }) {
	const list = set.map((item, key) => <Option { ...{ modState: modState?.[position] || {}, index, item, key, position: key,  onFocus, value, submit: i => {
			submit(i);
			setMod([
			 ...modState 
			 ]
			.map((mod, n) => n === position ? { ...mod, ...( item || {} ), index: i } : mod));
	}  } }/>);
	return <ul tabIndex='-1' className='stuff-faux-select-list'>{ list || null }</ul>;
};