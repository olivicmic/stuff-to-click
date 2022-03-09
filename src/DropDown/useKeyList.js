import { useState, useEffect } from "react";

export default function useKeyInput({ count = 0, dropdown, expanded, focus, open, pre = -1, close, submit }) {
	const [index, setIndex] = useState(pre);

	const handleKeyDown = e => {
		if (expanded && e.keyCode === 13) e.preventDefault(); // enter pressed
		else if (e.keyCode === 40) { //down arrow
			e.preventDefault();
			if (expanded) setIndex(index === count - 1 ? index : index + 1); // down limit
			else if (focus) open();
		} else if (e.keyCode === 38) { // Up arrow
			e.preventDefault();
			if (expanded) setIndex(index <= 0 ? 0: index - 1); // up limit
			else if (focus) open();
		}
	};

	const handleKeyUp = e => {
		if (expanded && e.keyCode === 13) { // enter released
			e.preventDefault();
			submit(index);
			close();
		} 
	};
	useEffect(() => {
		if (dropdown && focus) {  // set conditionally if not the input instance (check focus ref)
			document.addEventListener("keydown", handleKeyDown, false);
			document.addEventListener("keyup", handleKeyUp, false);

			return () => {
				document.removeEventListener("keydown", handleKeyDown, false);
				document.removeEventListener("keyup", handleKeyUp, false);
			};
		}
	}, [ dropdown, handleKeyDown, handleKeyDown ]);

	return [ index, close ];
};