import { useEffect } from 'react';

export default function outsideClose(ref, close, setFocus) {
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (ref.current && !ref.current.contains(event.target)) {
				setFocus(-1);
				close();
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
		// Unbind the event listener on clean up
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [ref]);
};