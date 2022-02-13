import { useEffect } from 'react';

export default function useOutside(close, setFocus, debug, host, id, focus) {
	useEffect(() => {
		const handleClickOutside = (event) => {

			console.log(id, host, event.target);
			if (host && focus && !host.contains(event.target)) console.log("whateva", !host.contains(event.target));
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