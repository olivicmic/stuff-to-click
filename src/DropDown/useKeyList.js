import { useState, useEffect } from "react";

export default function useKeyInput({ count = 0, expanded, focus, focusOff, open, pre = -1,  refStore, reset, submit }) {
	const [index, setIndex] = useState(pre);
	const close = func => {	setIndex(-1); reset(func); };

	const handleKeyDown = e => {
		if (e.keyCode === 9) focusOff(); // tab pressed
		else if (expanded && e.keyCode === 13) { // enter pressed
			e.preventDefault();
			submit(index);
			close();
		} 
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
		if (e.keyCode === 9) { // tab released
			refStore.focus();
			close();
		} else if (expanded && e.keyCode === 13) { // enter released
			e.preventDefault();
			refStore.nextSibling.focus();
		} 
	};
	useEffect(() => {
		document.addEventListener("keydown", handleKeyDown, false);
		document.addEventListener("keyup", handleKeyUp, false);

		return () => {
			document.removeEventListener("keydown", handleKeyDown, false);
			document.removeEventListener("keyup", handleKeyUp, false);
		};
	}, [ handleKeyDown, handleKeyDown ]);

	return [index, close];
};