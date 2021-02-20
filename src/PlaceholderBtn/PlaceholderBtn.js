import React from 'react';

export default function PlaceholderBtn({ active, onClick }) {
	return(
		<button type='button' onClick={onClick}>
			{active ? 'on' : 'off'}
		</button>
	);
};