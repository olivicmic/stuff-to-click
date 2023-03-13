import React from 'react';

export default function Popout({ component: Component, debug, mainRef, popoutStyle, style, ...rest }) {
	return Component && <div {...{ ref: mainRef, style: { ...popoutStyle, ...style } }}>
		<Component { ...{ debug, ...rest }} />
	</div>;
};