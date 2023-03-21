import React from 'react';
import Draggable from 'react-draggable';
import { adjustChild } from '../utilities';

export default function Popout({ component: Component, child, debug, off, mainRef, popoutStyle, style, transform, ...rest }) {
	const { dim, edge } = adjustChild(mainRef?.current, child);

	return Component &&
		 <Draggable {...{  
		 	bounds: { 
			 	left: -(edge[0] - dim[0]), 
			 	right: window.innerWidth - edge[0], 
			 	top: -(edge[1] - dim[1])
			 }, 
		 	handle: '.smile' 
		 }} >
			 <div {...{ ref: mainRef, style: { ...popoutStyle, ...style } }}>
				<div {...{ style: { ...style, transform } }}>
					<Component { ...{ debug, ...rest }} />
				</div>
			</div>
		</Draggable>;
};