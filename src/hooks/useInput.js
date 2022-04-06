import { useState } from 'react';
const b = () => {};

export default function useInput({ close = b, click = b, during = b, debug, hostid = 'clear' }) {
	const [focus, setFocus] = useState(false);
	return {
		events: {
			onBlur: e => {
				let targetID = e?.relatedTarget?.attributes?.hostid?.value;
				if (debug) console.log({location: 'stuff useInput onBlur', targetID, hostid});
				if (targetID !== hostid) {
					setFocus(false); close(e); 
			}},
			onClick: e => {
				if (debug) console.log({location: 'stuff useInput onClick', e});
				click(e);
			},
			onFocus: e => {
				if (debug) console.log({location: 'stuff useInput onClick', e});
				setFocus(true);
				during(e); 
			}
		},
		focus,
		setFocus
	};
};