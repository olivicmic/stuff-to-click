import { useEffect, useRef, useState } from 'react';
import { useTransition, animated, useSpring, config } from 'react-spring';
import useKeyList  from '../DropDown/useKeyList';
import useOutside  from '../DropDown/useOutside';

export default function useDropDown({ focus, debug, setFocus, submit, ...rest }) {
	const hostRef = useRef(null);
	//const spgRef = useSpringRef();
	const listRef = useRef(null);
	const host = hostRef.current;
	const list = listRef.current;
	const hostHeight = host ? parseInt(host.getBoundingClientRect().height) : 0;
	const font = host ? parseInt(getComputedStyle(host).getPropertyValue('font-size').slice(0,-2) ) : 0;
	const [listOffset, setOffset] = useState([0,0]);
	const [active, setActive] = useState(false);
	const [expanded, setExpanded] = useState(false);

	const [offPage, setOffPage] = useState(0);
	const [rendered, setRendered] = useState(false);
	//const [height, setHeight] = useState(0);
	//const [y, setY] = useState(0);
	const open = () => setActive(true);
	const [sprung, api] = useSpring(() => ({
		config: config.gentle,
		opacity: 0,
		transform: `translateY(0px)`,
	}));
	const [refStore, setRefStore] = useState(null);
	const reset = func => {
		api.start({ 
			opacity: 0,
			transform: `translateY(0px)`,
			onRest: () => {
				//console.log(document.activeElement);
				setRendered(false);
				setOffPage(false);
				setExpanded(false); 
				setActive(false);
			}
		});

				if (func) func();
	}
	
	const [index, close] = useKeyList({ active, focus, refStore, reset, expanded, open, submit, ...rest });
	//const springRef = useSpringRef();

	//const jammt = () => console.log(offPage);


	
	useOutside(listRef, close, debug, setFocus);
	//console.log({focus, active, rendered, refStore, thing: document.activeElement});
	useEffect(() => {
		if (host && !refStore) { 
			//console.log(host);
			setRefStore(host);
		}
		if (active && !expanded) {
			//console.log('onnn');
			setExpanded(true);
		} 
		if (expanded && !rendered) {
			//console.log('huh');
			let listBox = list.getBoundingClientRect();
			let hostBox = host.getBoundingClientRect();
			let listHeight = listBox.height;
			let hosttHeight = host.offsetHeight;
			let listCenter = host.offsetTop + (hosttHeight / 2);
			let yOff = listCenter - (listHeight / 2);
			//console.log(host.nextSibling);
			setOffset([host.offsetLeft, yOff]);
			//console.log(hostBox.height, hosttHeight, window.innerHeight);
			if ((hostBox.y + font + listHeight ) > window.innerHeight) {
				//console.log('heyyya');
				setOffset([host.offsetLeft, listCenter - listHeight]);
			 	api.start({ opacity: 1,
					transform: `translateY(${  -((hosttHeight / 2) + font) }px)` 
				});
				
			} else  {
				setOffset([host.offsetLeft, listCenter]);
				api.start({ opacity: 1,
					transform: `translateY(${  ((hosttHeight / 2) + font) }px)` 
				});
			}
			setRendered(true);
		}
		if (!focus && !debug) {
			//console.log('tooot');
			let hosttHeight = host ? host.offsetHeight : 0;
			//close(); setRendered(false); setOffPage(false); setExpanded()
		}
	});
/*
	useEffect(() => {

	api.start({ transform: `translateY(${ (expanded ? ( offPage && rendered ) ? -(hostHeight + height + font ): font : -(height / 2)) + 'px' })` });
		if (!focus && !debug) {close(); setRendered(false); setOffPage(false); setHeight(0); setY(0);}
		if (active && !expanded) {
			debug && console.log(host.offsetLeft, host.offsetTop, host.offsetHeight);
			setOffset([host.offsetLeft, (host.offsetTop + host.offsetHeight)]);
			
			setExpanded(true);
		}
	},[expanded, list, focus, host, index, active]);

	useEffect(() => {
		if (rendered) {
			if (list) {
				//let listBox = list.getBoundingClientRect();
				setHeight(parseInt(list.height));
				setY(parseInt(list.y))
				console.log(y, height, window.innerHeight, (y + height) > window.innerHeight);
				if ((y + height) > window.innerHeight) {
					console.log("bammmm");
					setOffPage(true);
				}
			}

		}
	},[list, rendered, setOffPage]);

*/
	return { active, close, expanded, hostRef, index, listOffset, listRef, offPage, open, rendered, setExpanded, setOffset, setRendered, sprung, start: api.start};
};