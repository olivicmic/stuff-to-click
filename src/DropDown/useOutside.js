import { useEffect } from 'react';

export default function useOutside(close, setFocus, debug, host, id, focus) {
	useEffect(() => {
		const handleClickOutside = (event) => {
			setFocus(false);
			close();
		};
		document.addEventListener("mousedown", handleClickOutside);  // set conditionally if not the input instance (check focus ref)
		return () => {
		// Unbind the event listener on clean up
			document.removeEventListener("mousedown", handleClickOutside); // set conditionally if not the input instance (check focus ref)
		};
	}, [close, setFocus]);
};