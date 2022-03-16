import { useState } from 'react';

export default function useSelectState(initial) {
	const [active, setActive] = useState(false); // select is focused, dropdown rendered but not visible
	const [rendered, setRendered] = useState(false); // select is focused, dropdown visible
	const [index, setIndex] = useState(initial); // numerical value of currently selected option -1 = none
	const [valueName, setValueName] = useState(null); // name for currently selected option

	return { active, index, rendered, setActive, setIndex, setRendered, setValueName, valueName };
};