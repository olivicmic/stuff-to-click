import React, { useContext, useState } from 'react';
import { useStateRef } from 'hangers';
import useKeySelect from './useKeySelect';
import useSelectState from './useSelectState';
import Option  from '../Option';
import Picker  from '../Picker';
import { ModalContext } from '../Context';
import { useAnimatedDrop, useInput } from '../hooks';

export default function useSelect({ name, onChange, set, toDo = () => {}, valid, value }) {
	const [host, setHost] = useStateRef();
	const [input, inputRef] = useStateRef();
	const unFocus = () => input?.focus() || {};
	const { active, index, setActive, setIndex, setValueName, valueName } = useSelectState(set.indexOf(value));
console.log(index);

	const hostHeight = host?.offsetHeight || 0;
	const hostHalf = hostHeight / 2 || 0;
	const font = host ? parseInt(getComputedStyle(host).getPropertyValue('font-size').slice(0,-2) ) : 0;

	const [sprung, enter, exit] = useAnimatedDrop({ 
		onRest: () => setActive(false),
		to: [ 0, hostHalf + (font / 2) ] 
	});

	const { addModal, current, modals, modState, setKill, setMod } = useContext(ModalContext);
	const updateModal = (i, d) => {
		let newSt = [ ...modState ].filter((mod, n) => {
			console.log(n, i, current, d);
			let huh = n === current ? { ...mod, ...( d || {} ), index: i } : mod;
			console.log(huh);
			return huh;
		} );
		console.log('heyyyy', i, d, setMod, modState, newSt);
		setMod(newSt);
};

	const setIndices = (i, d) => {
		console.log(i,d);
		updateModal(i, d);
		setIndex(i);
	};
	const submit = y => {
		console.log('submitted:', y);
		onChange({ target: {...set[y], name }});
		setValueName(set[y].label);
		setKill(current);
		setIndex(i); 
	};
	const keySubmit = y => { 
		updateModal(y, set[y]); submit(y);
	};

	const open = () => { 
		setActive(true); 
		addModal({ content: <Picker { ...{ set, index, onFocus: unFocus, value, submit } }/>, focus }) 
	};

	const close = func => {	setKill(current); setIndex(-1); };
	const { events, focus } = useInput({ close, click: open });
	const keyInput = useKeySelect({ active, current, close, count: set.length, focus, index, open, setIndices, setIndex, setKill, submit: keySubmit });
	const wrapProps = { events, focus, inputRef, valueName, setHost };

	return { keyInput, wrapProps };
};