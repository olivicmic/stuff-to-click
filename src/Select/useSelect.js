import React from 'react';
import { useStateRef } from 'hangers';
import useKeySelect from './useKeySelect';
import useOverlayAnchor from './useOverlayAnchor';
import useSelectState from './useSelectState';
import Picker  from '../Picker';
import { useInput, useOverlayContext } from '../hooks';

export default function useSelect({ name, onChange, set, valid, value }) {
	const { addOverlay, current, deleteOverlay, overlays, updateOverlay } = useOverlayContext();
	const { setHost, host } = useOverlayAnchor();
	const [input, inputRef] = useStateRef();
	const { active, index, setActive, setIndex, valueName } = useSelectState(value, set);

	const onFocus = () => { input?.focus() || {} };
	const setIndices = (i) => { updateOverlay(i); setIndex(i); };
	const close = () => { setActive(false); deleteOverlay(current); setIndex(-1); };
	const submit = y => { onChange({ target: {...set[y], name }}); close(); };
	const keySubmit = y => { updateOverlay(y, set[y]); submit(y); };

	const open = () => {
		if (!active) {
			setActive(true); 
			addOverlay({
				component: Picker,
				host,
				onFocus,
				state: { focus, set, submit, value, index }
			});
		} else close();
	};

	const { events, focus } = useInput({ close, click: open, hostid: overlays?.[current]?.overlayID });
	const keyInput = useKeySelect({ active, close, count: set.length, focus, index, open, setIndices, submit: keySubmit });

	return { keyInput, wrapProps: { events, focus, inputRef, valueName, setHost } };
};