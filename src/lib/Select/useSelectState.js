import { useState } from 'react';

export default function useSelectState(value, set) {

	const [active, setActive] = useState(false); // select is focused, dropdown rendered but not visible
	const [index, setIndex] = useState(set.findIndex((item,i) => item.value === value)); // number of currently selected -1 = none
	const [hostid, setID] = useState(); // a unique ID set when creating an overlay
	const valueName = set.find((item,i) => item.value === value)?.label || value;

	return { active, hostid, index, setActive, setID, setIndex, valueName };
};