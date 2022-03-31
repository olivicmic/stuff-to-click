import React, { useContext } from 'react';
import { useStateRef } from 'hangers';
import useKeySelect from './useKeySelect';
import useOverlayAnchor from './useOverlayAnchor';
import useSelectState from './useSelectState';
import Picker  from '../Picker';
import { ModalContext } from '../Context';
import { useInput } from '../hooks';

export default function useSelect({ name, onChange, set, valid, value }) {
	const { addModal, current, deleteModal, modals, updateModal } = useContext(ModalContext);
	const { setHost, position } = useOverlayAnchor();
	const [input, inputRef] = useStateRef();
	const unFocus = () => { input?.focus() || {} };
	const { active, index, setActive, setIndex, setValueName, valueName } = useSelectState(set.indexOf(value));
	const setIndices = (i) => {
		console.log('🔢 useSelect setIndices', modals, i);
		updateModal(i);
		setIndex(i);
	};
	const close = () => { console.log('😴 useSelect.js, closing modal'); setActive(false); deleteModal(current, 1); setIndex(-1); };
	const submit = y => {
		console.log('➡️ useSelect submit', y);
		onChange({ target: {...set[y], name }});
		setValueName(set[y].label);
		setIndex(y);
		close();
	};
	const keySubmit = y => {
		console.log("eeee", y);
		updateModal(y, set[y]);
		submit(y);	};

	const open = () => {
		if (!active) {
			setActive(true); 
			addModal({
				...position,
				component: Picker,
				onFocus: unFocus,
				state: { focus, set, submit, value, index, keySubmit }
			});
		} else close();
	};

	const { events, focus } = useInput({ close, click: open, hostid: modals?.[current]?.modID });
	const keyInput = useKeySelect({ active, current, close, count: set.length, focus, index, open, setIndices, submit: keySubmit });
	const wrapProps = { events, focus, inputRef, valueName, setHost };

	return { keyInput, wrapProps };
};