import React from 'react';
import Option  from '../Option';

export default function Picker({ set, modals, onFocus, position, submit, setModals, ...rest }) {
	const newSubmit = (i, option) => {
		submit(i);
		setModals([
			 ...modals 
		]
		.map((mod, n) => n === position ? { ...mod, ...( option || {} ), index: i } : mod));
	}; 
	const list = set.map((item, key) => <Option { ...{ modState: modals?.[position] || {}, item, key, position: key,  onFocus, submit: i => newSubmit(i, item) } }/>);
	return <ul tabIndex='-1' className='stuff-faux-select-list'>{ list || null }</ul>;
};