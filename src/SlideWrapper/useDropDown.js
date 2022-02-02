import { useEffect, useRef, useState } from 'react';

export default function useDropDown({ debug }) {
	const hostRef = useRef(null);
	const [listOffset, setOffset] = useState([0,0]);
	const [active, setActive] = useState(false);
	const [expanded, setExpanded] = useState(false);
	const open = () => setActive(true);
	const close = () => { setActive(false); setExpanded(false)};

	useEffect(() => {
		let listRef = hostRef.current;
		
		if (active && !expanded) {
			debug && console.log(listRef.offsetLeft, listRef.offsetTop, listRef.offsetHeight);
			setOffset([listRef.offsetLeft, (listRef.offsetTop + listRef.offsetHeight)]);
			setExpanded(true);
		}
	},[hostRef, active]);
	return { active, close, expanded, hostRef, listOffset, open, setOffset };
};