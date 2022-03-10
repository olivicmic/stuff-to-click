import { useEffect, useState } from 'react';

export default function usePhasedInput({ toDo = () => {}, valid, value }) { /// rename useInputPhase
	const [focus, setFocus] = useState(false);
	const [active, setActive] = useState(false);
	const [valueName, setValueName] = useState(null);
	const [expanded, setExpanded] = useState(false);
	const [rendered, setRendered] = useState(false);
	const onBlur = () => setFocus(false);
	const onClick = () => setActive(true) && toDo();
	const onFocus = () => setFocus(true);
	const onRest = () => {
		setRendered(false);
		setExpanded(false); 
		setActive(false);
	};
	const open = () => setActive(true);

	return {
		active, expanded, focus, onRest, valueName, rendered, open, setExpanded, setRendered, setValueName, events: { onBlur, onClick, onFocus}
	};
};