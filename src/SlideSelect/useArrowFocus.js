import { useCallback, useState, useEffect } from "react";

export default function useArrowFocus(set, expanded, close, onChange, name) {
	const [currentFocus, setCurrentFocus] = useState(-1);
	const size = set.length;

	const handleKeyDown = useCallback(e => {
		if (expanded && e.keyCode === 40) {
			// Down arrow
			e.preventDefault();
			setCurrentFocus(currentFocus === size - 1 ? currentFocus : currentFocus + 1);
		} else if (expanded && e.keyCode === 38) {
			// Up arrow
			e.preventDefault();
			setCurrentFocus(currentFocus === 0 ? 0: currentFocus - 1);
		} else if (expanded && e.keyCode === 13) {
			e.preventDefault();
			onChange({ target: {...set[currentFocus], name: name}});
			setCurrentFocus(-1);
			close();
		}
	},[size, currentFocus, setCurrentFocus, close, onChange]);

	useEffect(() => {
		document.addEventListener("keydown", handleKeyDown, false);
		return () => {
			document.removeEventListener("keydown", handleKeyDown, false);
		};
	}, [handleKeyDown]);

	return [currentFocus, setCurrentFocus];
};