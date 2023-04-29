import { useRef } from 'react';
import { useInput, useOverlayContext } from '../hooks';
import useKeySelect from './useKeySelect';
import useSelectState from './useSelectState';

export default function useSelect({ debug, fixed, id, name, options, onChange, type, valid, value }) {
	const { popouts } = useOverlayContext();
	const inputRef = useRef();
	const { active, hostid, index, setActive, setID, setIndex, valueName } = useSelectState(value, options);
	const count = options.length;

	const onFocus = () => { inputRef.current.focus && inputRef.current.focus() };
	const setIndices = i => { popouts.update(hostid, { index: i }); setIndex(i); };
	const close = (targetID, selected) => {
		setActive(false);
		popouts.remove(targetID || hostid);
		setIndex(selected);
	};
	const submit = ({ target: { selectID, value: y }}) => {
		let newIndex = options.findIndex((opt, i) => opt.value === y);
		onChange({ target: {
			value: y,
			count,
			name,
			index: newIndex
		}}); 
		close(selectID,newIndex); };
	const keySubmit = y => {
		let valueUpdate = { ...options[y], name, index: y, selectID: hostid };
		popouts.update(hostid, valueUpdate); 
		submit({ target: valueUpdate });
	};
	const open = () => {
		if (!active) {
			setActive(true);

			popouts.open((type || 'picker'),{
				debug,
				fixed,
				onFocus,
				onOpened: setID,
				initial: { focus, name, options, submit, value, index },
				target: inputRef.current
			});
		} else close(hostid);
	};

	const { events, focus } = useInput({ close, click: open, hostid, id });
	const keyInput = useKeySelect({ active, close, count, focus, index, open, setIndices, submit: keySubmit });

	if (active && debug?.value && value) console.log(value, valueName);
	return { keyInput, wrapProps: { events, focus, inputRef, valueName } };
};