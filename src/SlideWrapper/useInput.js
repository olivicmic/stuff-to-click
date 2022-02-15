import { useEffect, useState } from 'react';

export default function usePhasedInput({ toDo = () => {}, valid, value }) { /// rename useInputPhase
	const [focus, setFocus] = useState(false);
	const [active, setActive] = useState(false);
	const [valueName, setValueName] = useState(null);
	const onBlur = () => setFocus(false);
	const onClick = () => setActive(true) && toDo();
	const onFocus = () => setFocus(true);

	return [
		{ active, focus, valueName }, // state
		{ setActive, setFocus, setValueName }, // controls
		{ onBlur, onClick, onFocus}]; // events
};