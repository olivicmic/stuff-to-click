import { useState } from 'react';
const b = () => {};

export default function useInput({ close = b, click = b, start = b }) {
	const [focus, setFocus] = useState(false);
	return {
		events: {
			onBlur: () => { setFocus(false); close() },
			onClick: () => click(),
			onFocus: () => { setFocus(true); start() }
		},
		focus,
		setFocus
	};
};