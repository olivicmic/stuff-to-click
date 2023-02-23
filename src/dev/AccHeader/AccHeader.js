import React from 'react';

export default function AccHeader ({ expanded, onClick, ...rest }) {
	return <button type='button' {...{ onClick }} >
		{expanded ? 'open' : 'closed'}
	</button>
};
