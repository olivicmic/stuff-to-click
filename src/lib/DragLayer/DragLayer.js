import React, { useState } from 'react';
import Draggable from 'react-draggable';
import { adjustChild } from '../utilities';

export default function DragLayer({ children, child, debug, fixed, host = {}, off = [0,0], mainRef, popoutStyle, style, transform, ...rest }) {
	const [winScroll] = useState(window.scrollY);
	const { dim, edge } = adjustChild(mainRef?.current, child);
	return <Draggable {...{  
	 	bounds: { 
		 	left: -(edge[0] - dim[0] - off[0]), 
		 	right: (window.innerWidth - edge[0] )+ off[0], 
		 	top: -(edge[1] - dim[1] - off[1])
		 },
		positionOffset: {
			x: off[0] * (host.orientation[0] ? 1 : -1 ),
			y: (off[1] && !fixed &&  host.orientation[1]) ? 
				-(document.body.offsetHeight - window.innerHeight - winScroll) : -off[1]
		},
		...child.handle ? { handle: child.handle } : { disabled: true }
	 }} >
		 <div {...{ ref: mainRef, style: { ...popoutStyle, ...style } }}>
			<div {...{ style: { ...style, transform } }}>
				{ children }
			</div>
		</div>
	</Draggable>;
};