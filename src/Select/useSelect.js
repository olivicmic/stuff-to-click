import React, { useContext, useState } from 'react';
import { useStateRef } from 'hangers';
import useKeySelect from './useKeySelect';
import useSelectState from './useSelectState';
import Option  from '../Option';
import Picker  from '../Picker';
import { ModalContext } from '../Context';
import { useInput } from '../hooks';

export default function useSelect({ name, onChange, set, toDo = () => {}, valid, value }) {
	const [host, setHost] = useStateRef();
	const [input, inputRef] = useStateRef();
	const unFocus = () => input?.focus() || {};
	const { active, index, setActive, setIndex, setValueName, valueName } = useSelectState(set.indexOf(value));

	const hostHeight = host?.offsetHeight || 0;
	const hostHalf = hostHeight / 2 || 0;
	const font = host ? parseInt(getComputedStyle(host).getPropertyValue('font-size').slice(0,-2) ) : 0;

// to: [ 0, hostHalf + (font / 2) ] important?

	const { addModal, current, modals, modState, setKill, setMod } = useContext(ModalContext);
	const updateModal = (i) => {
		let newSt = [ ...modState ].map((mod, n) => {
			let huh = n === current ? { ...mod, index: i } : mod;
			return huh;
		} );
		setMod(newSt);
};

	const setIndices = (i) => {
		console.log(i);
		updateModal(i);
		setIndex(i);
	};
	const submit = y => {
		onChange({ target: {...set[y], name }});
		setValueName(set[y].label);
		setKill(current);
		setIndex(y); 
	};
	const keySubmit = y => { 
		updateModal(y, set[y]); submit(y);
	};

	const open = () => { 
		setActive(true); 
		addModal({
			component: Picker,
			content: { set, index, onFocus: unFocus, value, submit },
			focus
		}) 
	};

	const close = func => {	
		setActive(false); setKill(current); setIndex(-1); };
	const { events, focus } = useInput({ close, click: open });
	const keyInput = useKeySelect({ active, current, close, count: set.length, focus, index, open, setIndices, setIndex, setKill, submit: keySubmit });
	const wrapProps = { events, focus, inputRef, valueName, setHost };

	return { keyInput, wrapProps };
};