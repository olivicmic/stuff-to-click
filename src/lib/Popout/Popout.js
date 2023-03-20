import React from 'react';

export default function Popout({ component: Component, ...rest }) {
	return <Component { ...{ ...rest }} />;
};