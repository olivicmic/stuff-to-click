import { useEffect, useState } from 'react';
import { useTransition, animated, easings, useSpring, config } from 'react-spring';
import useKeyList  from '../DropDown/useKeyList';
import useOutside  from '../DropDown/useOutside';

export default function useDropDown({ active, debug, dropdown, focus, host, focusChild, hostRef, id, listHeight, name, onChange, options, set, setActive, setFocus, setValueName, value, ...rest }) {
	const font = host ? parseInt(getComputedStyle(host).getPropertyValue('font-size').slice(0,-2) ) : 0;
	const [listOffset, setOffset] = useState([0,0]);
	const [expanded, setExpanded] = useState(false);
	const [rendered, setRendered] = useState(false);
	const open = () => setActive(true);
	const [sprung, api] = useSpring(() => ({
		opacity: 0,
		transform: `translateY(0px)`,
	}));
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
	const submit = y => onChange({ target: {...set[y], name }}) && setValueName(set[y].label);

	const [index, close] = useKeyList({ count: set.length, dropdown, focus, host, id, pre: set.indexOf(value), reset, expanded, open, submit, ...rest });
	const items = options ? options({ close, focusChild, index, value, submit }) : null;
	const animateIn = (dir, y) => api.start({ 
		config: {			
			duration: 500,
			easing: easings.easeOutCirc,
		},
		opacity: 1, 
		transform: `translateY(${ (dir || -1 )* (y + font) }px)`
	});
	
	useOutside(close, setFocus, debug, host, id, focus);

	useEffect(() => {
		if (dropdown && active && !expanded) setExpanded(true);
		if (dropdown && listHeight && expanded && !rendered) {
			let hostY = host.getBoundingClientRect().y;
			let hostHeight = host.offsetHeight;
			let hostHalf = hostHeight / 2;
			let listCenter = host.offsetTop + hostHalf;
			let yOff = listCenter - (listHeight / 2);

			setOffset([host.offsetLeft, yOff]);
			setRendered(true);

			if ((hostY + font + listHeight ) > window.innerHeight) {
				setOffset([host.offsetLeft, listCenter - listHeight]);
			 	animateIn(0, hostHalf);
				
			} else  {
				setOffset([host.offsetLeft, listCenter]);
				animateIn(1, hostHalf);
			}
		}
	}, [active, animateIn, dropdown, expanded, font, host, rendered, setExpanded, setOffset, setRendered ]);
	return { close, expanded, index, items, listOffset, open, setOffset, sprung };
};