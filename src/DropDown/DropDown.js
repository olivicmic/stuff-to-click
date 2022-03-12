import React  from 'react';
import { animated } from 'react-spring';
import useDropDown from './useDropDown';
import { useStateRef } from 'hangers';

export default function DropDown({ listStyle, selState, items, ...rest }) {
	const { active, sprung, onFocus } = selState;
	const [listHeight, ref] = useStateRef(e => (e?.getBoundingClientRect().height || 0));
 	const { listOffset } = useDropDown({ ...rest, listHeight, selState });

	return active && items ? <animated.ul { ...{ onFocus, ref } } tabIndex='-1' className='stuff-faux-select-list' style={{
			...listStyle,
			...sprung,
			left:  listOffset[0] + 'px',
			top: listOffset[1] + 'px',
		}}>
			{items}
		</animated.ul> : null;
};