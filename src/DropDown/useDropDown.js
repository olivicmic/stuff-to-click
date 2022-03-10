import { useEffect, useState } from 'react';
import { useTransition, animated, easings, useSpring, config } from 'react-spring';
import useAnimatedDrop from './useAnimatedDrop';
import useKeyList  from '../DropDown/useKeyList';
import useOutside  from '../DropDown/useOutside';

export default function useDropDown({ debug, host, listHeight, selState }) {
	const { active, enter, rendered, setRendered, onRest } = selState;
	const font = host ? parseInt(getComputedStyle(host).getPropertyValue('font-size').slice(0,-2) ) : 0;
	const [listOffset, setOffset] = useState([0,0]);

	useEffect(() => {
		if (listHeight && active && !rendered) {
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
	}, [active, enter, font, host, listHeight, rendered, setOffset, setRendered ]);
	return { listOffset };
};