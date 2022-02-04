import { useCallback, useState, useEffect } from "react";

export default function useKeyInput({ focus, reset, count = 0, expanded, active, open, pre = -1, setValueName, submit }) {
	const [index, setIndex] = useState(pre);
	const close = () => { setIndex(-1); reset(); };

	const handleKeyDown = useCallback(e => {
		if (e.keyCode === 9) close();
		else if (e.keyCode === 40) { //down arrow
			e.preventDefault();
			if (expanded) setIndex(index === count - 1 ? index : index + 1);
			else if (active || focus) open();
		} else if (e.keyCode === 38) { // Up arrow
			e.preventDefault();
			if (expanded) setIndex(index <= 0 ? 0: index - 1);
			else if (active || focus) open();
		} else if (expanded && e.keyCode === 13) { // enter
			e.preventDefault();
			submit(index);
			close();
		} 
	},[count, index, setIndex, focus, expanded]);

	useEffect(() => {
		document.addEventListener("keydown", handleKeyDown, false);
		return () => {
			document.removeEventListener("keydown", handleKeyDown, false);
		};
	}, [handleKeyDown]);

	return [index, close];
};