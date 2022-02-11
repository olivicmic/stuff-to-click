import React, { useEffect, useRef, useState }  from 'react';
import { animated } from 'react-spring';
import useDropDown from './useDropDown';

export default function DropDown({ active, host, listStyle, ...rest }) {
	const [list, setList] = useState(null);
	//console.log(rest);
	const fuckit = useRef(null);
	const tmpList = fuckit.current;
 	const { items, listOffset, sprung } = useDropDown({ ...rest, active, host, list });
 	//console.log(items);
 	useEffect(() => {
 		//console.log(tmpList, list);
 		if ( tmpList && !list) {
 			//console.log("huhhhh");
 			setList(tmpList);
 		}
 	}, [tmpList, list]);

	return active && items ? <animated.ul key='jammy' ref={fuckit} tabIndex='-1' className='stuff-faux-select-list' style={{
			...listStyle,
			...sprung,
			left:  listOffset[0] + 'px',
			top: listOffset[1] + 'px',
		}}>
			{items}
		</animated.ul> : null;
};