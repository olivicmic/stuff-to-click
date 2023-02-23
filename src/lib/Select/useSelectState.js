import { useEffect, useState } from 'react';

export default function useSelectState(value, set) {
	const [active, setActive] = useState(false); // select is focused, dropdown rendered but not visible
	const [index, setIndex] = useState(set.indexOf(value)); // number of currently selected -1 = none
	const [valueName, setValueName] = useState(null); // name for currently selected option
	const [hostid, setID] = useState(); // a unique ID set when creating an overlay

	useEffect(() => {
		if (set && value) {
			let i = set.indexOf(value);
			setIndex(i);
			setValueName(set[i]?.label || null);
		}
	},[value, set]);

	return { active, hostid, index, setActive, setID, setIndex, valueName };
};