import React from 'react';
import { animated } from 'react-spring';
import Draggable from 'react-draggable';
import { adjustChild } from '../utilities';

export default function DragLayer({ children, child, debug, fixed, host = {}, offSE = [0,0], offNW, mainRef, popoutStyle, style, transform, ...rest }) {
	const xy = [host.positions(0,0) || 0,host.positions(1,0) || 0];
	const { dim, edge } = adjustChild(mainRef?.current, child, xy, host.orientation, fixed);
	const win = [window.innerWidth, window.innerHeight];
	const ctrMargin = ax => ((win[ax] - dim[ax]) / 2 );

	return <Draggable {...{  
	 	bounds: {
		 	left: -(child.centerX ? ctrMargin(0) : (edge[0] - dim[0] - offSE[0])), 
		 	right: child.centerX ? ctrMargin(0) : ((window.innerWidth - edge[0]) + offSE[0]), 
		 	top:  -(child.centerY ? ctrMargin(1) :  edge[1] - dim[1] - offSE[1]),
		 	bottom: child.centerY ? ctrMargin(1) :  ((window.innerHeight - edge[1]) + offSE[1])
		 },
		positionOffset: {
			x: ( offSE[0] ? -offSE[0] : offNW[0] ? offNW[0] : 0),
			y: ( offSE[1] ? -offSE[1] : offNW[1] ? offNW[1] : 0)
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