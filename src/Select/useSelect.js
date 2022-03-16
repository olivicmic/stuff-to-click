import React from 'react';
import { useStateRef } from 'hangers';
import useKeySelect from './useKeySelect';
import useSelectState from './useSelectState';
import Option  from '../Option';
import { useAnimatedDrop, useInput } from '../hooks';

export default function useSelect({ name, onChange, set, toDo = () => {}, valid, value }) {
	const [host, setHost] = useStateRef();
	const [input, inputRef] = useStateRef();
	const unFocus = () => input?.focus() || {};
	const { active, index, rendered, setActive, setIndex, setRendered, setValueName, valueName } = useSelectState(set.indexOf(value));
	const [sprung, enter, exit] = useAnimatedDrop({ onRest: () => {setRendered(false); setActive(false)} });
	const open = () => setActive(true);
	const close = func => {	setIndex(-1); exit(func); };
	const { events, focus } = useInput({ close, click: open });
	const submit = y => onChange({ target: {...set[y], name }}) && setValueName(set[y].label);
	const list = props => set.map((item, key) => <Option { ...{ ...props, item, key, position: key } }/>);
	const items = list({ close, index, onFocus: unFocus, value, submit });
	const keyInput = useKeySelect({ active, close, count: set.length, focus, index, open, setIndex, submit });
	const wrapProps = { events, focus, inputRef, valueName, setHost };

	return {
		active, host, items, keyInput, rendered, onFocus: unFocus, setRendered, sprung, enter, wrapProps };
};