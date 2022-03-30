import React, { useEffect, useState } from 'react';
import Option  from '../Option';

export default function Picker({ modals, modID, onFocus, position, submit, setModals, state, index, updateModal, ...rest }) {
	const [local, setLocal] = useState(state || {
		focus: false,
		index: -1,
		set: [],
		submit: () => {}
	});

	useEffect(() => {
		if (state) setLocal(state);
	},[state]);

	const newSubmit = (i, option) => {
		local.submit(i);
		updateModal(option, i);
	}; 
	const list = local?.set.map((item, key) => <Option { ...{ modState: local || {}, item, key, position: key,  onFocus, submit: i => newSubmit(i, item) } }/>) || null;
	return <ul tabIndex='-1' className='stuff-faux-select-list' onFocus={onFocus} hostid='modID'>{ list || null }</ul>;
};