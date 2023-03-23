import React from 'react';
// import React, { useState } from 'react';
import { animated } from 'react-spring';
import Draggable from 'react-draggable';
import { adjustChild } from '../utilities';

export default function DragLayer({ children, child, debug, fixed, host = {}, off = [0,0], mainRef, popoutStyle, style, transform, ...rest }) {
	// const [winScroll] = useState(window.scrollY);
	const xy = [host.positions(0,0) || 0,host.positions(1,0) || 0];
	const { dim, edge } = adjustChild(mainRef?.current, child, xy, host.orientation, fixed);
	console.log(off[0]);

	return <Draggable {...{  
	 	bounds: {
		 	left: -(edge[0] - dim[0] - off[0]), 
		 	right: (window.innerWidth - edge[0] ) + off[0], 
		 	top: -(edge[1] - dim[1] - off[1])
		 },
		positionOffset: {
			x: -( off[0] ? off[0] : 0),
			y: -( off[1] ? off[1] : 0)
		},
		...child.handle ? { handle: child.handle } : { disabled: true }
	 }} >
		 <animated.div {...{ ref: mainRef, style: { ...popoutStyle, ...style } }}>
			<div {...{ style: { transform } }}>
				{ children }
			</div>
		</animated.div>
	</Draggable>;
};