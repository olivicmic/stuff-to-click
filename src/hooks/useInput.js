import { useState } from 'react';
const b = () => {};

export default function useInput({ close = b, click = b, during = b, hostid = 'clear' }) {
	const [focus, setFocus] = useState(false);
	return {
		events: {
			onBlur: e => { if (e?.relatedTarget?.attributes?.hostid?.value !== hostid) { 
				setFocus(false); close(e); 
			}},
			onClick: e => click(e),
			onFocus: e => { setFocus(true); during(e) }
		},
		focus,
		setFocus
	};
};