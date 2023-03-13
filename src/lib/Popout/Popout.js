import React from 'react';

export default function Popout({ component: Component, debug, ...rest }) {
	return Component && <Component { ...{ debug, ...rest }} />;
};