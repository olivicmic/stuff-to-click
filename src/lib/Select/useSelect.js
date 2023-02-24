import { useInput, useStateRef } from 'hangers';
import { useOverlayContext } from '../hooks';
import useKeySelect from './useKeySelect';
import useSelectState from './useSelectState';

export default function useSelect({ debug, id, name, onChange, set, valid, value }) {
	const { popout } = useOverlayContext();
	const [input, inputRef] = useStateRef();
	const { active, hostid, index, setActive, setID, setIndex, valueName } = useSelectState(value, set);
	const count = set.length;
	const onFocus = () => { input.focus && input.focus() };
	const setIndices = i => { popout.update(hostid, { index: i }); setIndex(i); };
	const close = targetID => { setActive(false); popout.remove(targetID || hostid); setIndex(-1); };
	const submit = ({ target: { name: n, value: y }}) => {
		onChange({ target: { ...set[y], count, name, selectIndex: set.indexOf(set[y]) }}); close(n); };
	const keySubmit = y => { popout.update(hostid, { ...set[y], index: y }); submit({ target: { name: hostid, value: y}}); };

	const open = ({ target }) => {
		if (!active) {
			setActive(true);

			popout.open('picker',{
				debug: 'select picker',
				onFocus,
				initial: { focus, set, submit, value, index },
				target
			}, setID);
		} else close(hostid);
	};

	const { events, focus } = useInput({ close, click: open, debug: debug?.focus, hostid, id });
	const keyInput = useKeySelect({ active, close, count, focus, index, open, setIndices, submit: keySubmit });
	if (active && debug?.value && value) console.log(value, valueName);
	return { keyInput, wrapProps: { events, focus, inputRef, valueName } };
};