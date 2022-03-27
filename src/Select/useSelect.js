import React, { useContext, useState } from 'react';
import { useStateRef } from 'hangers';
import useKeySelect from './useKeySelect';
import useOverlayAnchor from './useOverlayAnchor';
import useSelectState from './useSelectState';
import Option  from '../Option';
import Picker  from '../Picker';
import { ModalContext } from '../Context';
import { useInput } from '../hooks';

export default function useSelect({ name, onChange, set, valid, value }) {
	const { addModal, current, deleteModal, modals, updateModal } = useContext(ModalContext);
	const { setHost, position } = useOverlayAnchor();
	const [input, inputRef] = useStateRef();
	const unFocus = () => { console.log("😡"); input?.focus() || {} };
	const { active, index, setActive, setIndex, setValueName, valueName } = useSelectState(set.indexOf(value));

	const setIndices = (i) => {
		console.log('🔢 useSelect setIndices', modals);
		updateModal(i);
		setIndex(i);
	};
	const submit = y => {
		console.log('➡️ useSelect submit', modals);
		onChange({ target: {...set[y], name }});
		setValueName(set[y].label);
		//setKill(current);
		setIndex(y); 
	};
	const keySubmit = y => {
		submit(y);
		updateModal(y, set[y]);
	};

	const open = () => {
		console.log('☻ useSelect.js, opening a modal', modals);
		setActive(true); 
		addModal({
			...position,
			component: Picker,
			onFocus: unFocus,
			state: { focus, set, submit, value, index }
		}) 
	};

	const close = func => { console.log('😴 useSelect.js, closing modal', modals, current); setActive(false); deleteModal(current, 1); setIndex(-1); };
	const { events, focus } = useInput({ close, click: open });
	const keyInput = useKeySelect({ active, current, close, count: set.length, focus, index, open, setIndices, submit: keySubmit });
	const wrapProps = { events, focus, inputRef, valueName, setHost };

	return { keyInput, wrapProps };
};