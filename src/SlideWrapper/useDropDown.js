import { useEffect, useRef, useState } from 'react';
import { useTransition, animated, easings, useSpring, config } from 'react-spring';
import useKeyList  from '../DropDown/useKeyList';
import useOutside  from '../DropDown/useOutside';

export default function useDropDown({ debug, dropdown, name, onChange, options, set, setFocus, setValueName, value, ...rest }) {
	const hostRef = useRef(null);
	const listRef = useRef(null);
	const host = hostRef.current;
	const list = listRef.current;
	const font = host ? parseInt(getComputedStyle(host).getPropertyValue('font-size').slice(0,-2) ) : 0;
	const [listOffset, setOffset] = useState([0,0]);
	const [active, setActive] = useState(false);
	const [expanded, setExpanded] = useState(false);
	const [rendered, setRendered] = useState(false);
	const open = () => setActive(true);
	const [sprung, api] = useSpring(() => ({
		opacity: 0,
		transform: `translateY(0px)`,
	}));
	const [refStore, setRefStore] = useState(null);
	const reset = func => {
		api.start({
			config: {			
				duration: 700,
				easing: easings.easeInQuart,
			},
			opacity: 0,
			transform: `translateY(0px)`,
			onRest: () => {
				setRendered(false);
				setExpanded(false); 
				setActive(false);
			}
		});

		if (func) func();
	}
	const submit = y => {
		onChange({ target: {...set[y], name }});
		setValueName(set[y].label);
	};
	const [index, close] = useKeyList({ count: set.length,  pre: set.indexOf(value), refStore, reset, expanded, open, submit, ...rest });
	const items = options ? options({ close, index, value, submit }) : null;
	const animateIn = (dir, y) => api.start({ 
		config: {			
			duration: 500,
			easing: easings.easeOutCirc,
		},
		opacity: 1, 
		transform: `translateY(${ (dir || -1 )* (y + font) }px)`
	});
	
	useOutside(close, setFocus, debug);

	useEffect(() => {
		if (dropdown && host && !refStore) setRefStore(host);
		if (dropdown && active && !expanded) setExpanded(true);
		if (dropdown && expanded && !rendered) {
			let hostY = host.getBoundingClientRect().y;
			let listHeight = list.getBoundingClientRect().height;
			let hostHeight = host.offsetHeight;
			let hostHalf = hostHeight / 2;
			let listCenter = host.offsetTop + hostHalf;
			let yOff = listCenter - (listHeight / 2);

			setOffset([host.offsetLeft, yOff]);

			if ((hostY + font + listHeight ) > window.innerHeight) {
				setOffset([host.offsetLeft, listCenter - listHeight]);
			 	animateIn(0, hostHalf);
				
			} else  {
				setOffset([host.offsetLeft, listCenter]);
				animateIn(1, hostHalf);
			}
			setRendered(true);
		}
	});
	return { active, close, expanded, hostRef, index, items, listOffset, listRef, open, setOffset, sprung };
};