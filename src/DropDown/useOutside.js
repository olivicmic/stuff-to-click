import { useEffect } from 'react';

export default function useOutside(close, setFocus, debug) {
	useEffect(() => {
		const handleClickOutside = (event) => {
			setFocus(false);
			close();
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
		// Unbind the event listener on clean up
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [close, setFocus]);
};