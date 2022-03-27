import React from 'react';
import Option  from '../Option';

export default function Picker({ set, modals, modID, onFocus, position, submit, setModals, state, index, ...rest }) {
	console.log(state);
	const newSubmit = (i, option) => {
		console.log('⚠️ Picker.js ... should not happen');
		submit(i);
		setModals({ 
			...modals, [modID]: { ...modals[modID], ...option, index: i } 
		});
	}; 
	const list = set.map((item, key) => <Option { ...{ modState: state || {}, item, key, position: key,  onFocus, submit: i => newSubmit(i, item) } }/>);
	return <ul tabIndex='-1' className='stuff-faux-select-list'>{ list || null }</ul>;
};