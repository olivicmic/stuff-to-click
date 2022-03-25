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
	const { addModal, current, modals, setKill, setModals } = useContext(ModalContext);
	const { setHost, from, to } = useOverlayAnchor();
	const [input, inputRef] = useStateRef();
	const unFocus = () => input?.focus() || {};
	const { active, index, setActive, setIndex, setValueName, valueName } = useSelectState(set.indexOf(value));

	const updateModal = (index, d)  => setModals([ ...modals ].map((itm, n) => n === current ? {
	 	...itm, ...d, index 
	 } : itm ));

	const setIndices = (i) => {
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
		submit(y);
		updateModal(y, set[y]);
	};

	const open = () => { 
		setActive(true); 
		addModal({
			component: Picker,
			focus,
			index,
			onFocus: unFocus,
			set,
			submit,
			from,
			to,
			value
		}) 
	};

	const close = func => {	setActive(false); setKill(current); setIndex(-1); };
	const { events, focus } = useInput({ close, click: open });
	const keyInput = useKeySelect({ active, current, close, count: set.length, focus, index, open, setIndices, submit: keySubmit });
	const wrapProps = { events, focus, inputRef, valueName, setHost };

	return { keyInput, wrapProps };
};