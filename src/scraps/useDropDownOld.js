import { useEffect, useRef, useState } from 'react';
import useKeyList  from '../DropDown/useKeyList';
import useOutside  from '../DropDown/useOutside';

export default function useDropDown({ focus, debug, submit, ...rest }) {
	const hostRef = useRef(null);
	const listRef = useRef(null);
	const host = hostRef.current;
	const list = listRef.current;
	const [listOffset, setOffset] = useState([0,0]);
	const [active, setActive] = useState(false);
	const [expanded, setExpanded] = useState(false);
	const open = () => setActive(true);
	const reset = () => { setActive(false); setExpanded(false)};
	const [index, close] = useKeyList({ active, focus, reset, expanded, open, submit, ...rest });
	const [offPage, setOffPage] = useState(false);
	const [rendered, setRendered] = useState(false);
	const [height, setHeight] = useState(0);


	
	useOutside(listRef, close, debug);

	useEffect(() => {
		if (!focus && !debug) {close(); setRendered(false); setOffPage(false);}
		if (active && !expanded) {
			debug && console.log(host.offsetLeft, host.offsetTop, host.offsetHeight);
			setOffset([host.offsetLeft, (host.offsetTop + host.offsetHeight)]);
			setExpanded(true);
			//setOffPage(0);
		}/*
		if (list) {
			let listBox = list.getBoundingClientRect();
			let listBottom = listBox.y + listBox.height;
			if (listBottom > window.innerHeight) {
				console.log(getComputedStyle(list), listBox, listBox.y + listBox.height, window.innerHeight);
				setOffPage(listBox.y + listBox.height);
				//setOffset([host.offsetLeft, (host.offsetTop - listBox.height)]);
			}
		}
		if (expanded && list) {
			console.log("deeek");
		}*/
	},[expanded, list, focus, host, index, active]);

	//console.log(height);

	useEffect(() => {
		if (rendered) {
			if (list) {
				let listBox = list.getBoundingClientRect();
				setHeight(parseInt(listBox.height));
				console.log(listBox.y, listBox.height,window.innerHeight, (listBox.y + listBox.height) > window.innerHeight);
				if ((listBox.y + listBox.height) > window.innerHeight) {
					console.log("bammmm");
					setOffPage(true);
				}
			}
			//let listBottom = listBox.y + listBox.height;
			//console.log(rendered);
			//setExpanded(true);
			//setOffPage(1);

		} //else setOffPage(false);
	},[list, rendered, setOffPage]);


	return { active, close, expanded, height, hostRef, index, listOffset, listRef, offPage, open, rendered, setExpanded, setOffset, setRendered };
};