import { useEffect, useState } from 'react';
import { useTransition, animated, easings, useSpring, config } from 'react-spring';
import useAnimatedDrop from './useAnimatedDrop';
import useKeyList  from '../DropDown/useKeyList';
import useOutside  from '../DropDown/useOutside';

export default function useDropDown({ active, debug, dropdown, host, listHeight, name, onChange, onFocus, options, set, index, selState, expanded, setFocus, setValueName, value, sprung, enter, exit, close, ...rest }) {
	const font = host ? parseInt(getComputedStyle(host).getPropertyValue('font-size').slice(0,-2) ) : 0;
	const [listOffset, setOffset] = useState([0,0]);
	const { setExpanded, rendered, setRendered, onRest } = selState;
	//const [sprung, enter, exit] = useAnimatedDrop({ onRest });

	const submit = y => onChange({ target: {...set[y], name }}) && setValueName(set[y].label);

	//const [index] = useKeyList({ count: set.length, dropdown, expanded, open, pre: set.indexOf(value), close, submit, ...rest });
	const items = options ? options({ close, index, onFocus, value, submit }) : null;
	
	useOutside(close, setFocus, host); 

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
			 	enter(0, hostHalf + font);
				
			} else  {
				setOffset([host.offsetLeft, listCenter]);
				enter(1, hostHalf + font);
			}
		}
	}, [active, enter, dropdown, expanded, font, host, rendered, setExpanded, setOffset, setRendered ]);
	return { items, listOffset, sprung };
};