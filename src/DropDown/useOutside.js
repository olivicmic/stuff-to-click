import { useEffect } from 'react';

export default function useOutside(ref, close, debug, setFocus) {
	useEffect(() => {
		const handleClickOutside = (event) => {
			//console.log("ummmmmm");
			setFocus(false);
			close();
			/*if (ref.current  && !ref.current.contains(event.target)) {
				console.log("umm");
				
			}*/
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
		// Unbind the event listener on clean up
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [ref]);
};