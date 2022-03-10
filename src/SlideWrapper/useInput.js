import React, { useEffect, useState } from 'react';
import { useStateRef } from 'hangers';
import useAnimatedDrop  from '../DropDown/useAnimatedDrop';
import FauxOption  from '../DropDown/FauxOption';
import useKeySelect from '../SlideSelect/useKeySelect';

export default function usePhasedInput({ name, onChange, set, toDo = () => {}, valid, value }) {
	const [host, setHost] = useStateRef();
	const [kid, kidRef] = useStateRef();
	const [index, setIndex] = useState(set.indexOf(value));
	const [focus, setFocus] = useState(false);
	const [active, setActive] = useState(false);
	const [valueName, setValueName] = useState(null);
	const [expanded, setExpanded] = useState(false);
	const [rendered, setRendered] = useState(false);
	const onRest = () => { setRendered(false); setExpanded(false); setActive(false); };
	const [sprung, enter, exit] = useAnimatedDrop({ onRest });
	const open = () => setActive(true);
	const close = func => {	setIndex(-1); exit(func); };
	const onBlur = () => { setFocus(false); close() };
	const onClick = () => setActive(true) && toDo();
	const onFocus = () => setFocus(true);
	const unFocus = () => kid?.focus() || {};
	
	const submit = y => onChange({ target: {...set[y], name }}) && setValueName(set[y].label);
	const list = props => set.map((item, key) => <FauxOption { ...{ ...props, item, key, position: key } }/>);
	const items = list({ close, index, onFocus: unFocus, value, submit });

	const keyInput = useKeySelect({ close, count: set.length, expanded, focus, index, open, setIndex, submit });
	const wrapProps = { events: { onBlur, onClick, onFocus }, focus, kidRef, valueName, setHost };
	// focus, onFocus, events, items, kidRef, valueName, 
	return {
		active, expanded, host, items, keyInput, rendered, onFocus: unFocus, setExpanded, setRendered, sprung, enter, wrapProps };
};