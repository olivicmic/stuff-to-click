import { useEffect, useRef, useState } from 'react';
import { useTransition, animated, easings, useSpring, config } from 'react-spring';
import useKeyList  from '../DropDown/useKeyList';
import useOutside  from '../DropDown/useOutside';

export default function useDropDown({ active, debug, dropdown, glob, host, hostRef, id, kid, list, name, onChange, options, set, setActive, setFocus, setValueName, value, ...rest }) {
	const font = host ? parseInt(getComputedStyle(host).getPropertyValue('font-size').slice(0,-2) ) : 0;
	const [listOffset, setOffset] = useState([0,0]);
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

				console.log("eyy");
				setRendered(false);
				setExpanded(false); 
				setActive(false);
				console.log("CLOSED");
			}
		});

		if (func) func();
	}
	const submit = y => {
		console.log("SUBMITTING");
		onChange({ target: {...set[y], name }});

		console.log("SUBMITTED");
		setValueName(set[y].label);
	};

	const [index, close] = useKeyList({ count: set.length, dropdown, host, glob, id, kid, pre: set.indexOf(value), reset, expanded, open, submit, ...rest });
	const items = options ? options({ close, index, value, submit }) : null;
	const animateIn = (dir, y) => api.start({ 
		config: {			
			duration: 500,
			easing: easings.easeOutCirc,
		},
		opacity: 1, 
		transform: `translateY(${ (dir || -1 )* (y + font) }px)`
	});
	
	useOutside(close, setFocus, debug, host, id, glob);

	useEffect(() => {
		//if (dropdown && host && !refStore) setRefStore(host);
		if (dropdown && active && !expanded) setExpanded(true);
		if (dropdown && list && expanded && !rendered) {
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
	}, [active, animateIn, dropdown, expanded, font, host, refStore, rendered, setExpanded, setOffset, setRendered ]);
	return { active, close, expanded, index, items, listOffset, open, setOffset, sprung };
};