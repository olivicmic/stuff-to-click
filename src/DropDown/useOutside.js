import { useEffect } from 'react';

export default function useOutside(ref, close, debug) {
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (ref.current && !ref.current.contains(event.target)) {
				if (!debug) close();
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
		// Unbind the event listener on clean up
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [ref]);
};