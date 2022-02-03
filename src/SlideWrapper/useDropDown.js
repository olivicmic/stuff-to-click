import { useEffect, useRef, useState } from 'react';
import useKeyList  from '../DropDown/useKeyList';

export default function useDropDown({ count, focus, debug, pre, setValueName, submit }) {
	const hostRef = useRef(null);
	const [listOffset, setOffset] = useState([0,0]);
	const [active, setActive] = useState(false);
	const [expanded, setExpanded] = useState(false);
	const open = () => setActive(true);
	const close = () => { setActive(false); setExpanded(false)};

	const [index, setIndex] = useKeyList({ close, count, expanded, focus, open, pre, setValueName, submit });

	useEffect(() => {
		let listRef = hostRef.current;
		
		if (active && !expanded) {
			debug && console.log(listRef.offsetLeft, listRef.offsetTop, listRef.offsetHeight);
			setOffset([listRef.offsetLeft, (listRef.offsetTop + listRef.offsetHeight)]);
			setExpanded(true);
		}
	},[hostRef, active]);
	return { active, close, expanded, hostRef, index, listOffset, listRef: useRef(null), open, setIndex, setOffset };
};