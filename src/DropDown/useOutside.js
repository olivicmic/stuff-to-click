import { useEffect } from 'react';

export default function useOutside(close, setFocus, debug, host, id, glob) {
	useEffect(() => {
		const handleClickOutside = (event) => {

			console.log(id, host, event.target);
			if (host && glob && !host.contains(event.target)) console.log("whateva", !host.contains(event.target));
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

/* import { useEffect } from 'react';

export default function outsideClose(ref, close, setFocus, debug) {
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (ref.current && !ref.current.contains(event.target)) {
				setFocus(-1);
				if (!debug) close();
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
		// Unbind the event listener on clean up
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [ref]);
}; */