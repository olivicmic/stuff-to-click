import { useCallback, useState, useEffect } from "react";

export default function useArrowFocus(set, expanded, expand, close, onChange, name, focus) {
	const [currentFocus, setCurrentFocus] = useState(-1);
	const size = set.length;

	const handleKeyDown = useCallback(e => {
		if (e.keyCode === 40) {
			e.preventDefault();
			if (expanded) setCurrentFocus(currentFocus === size - 1 ? currentFocus : currentFocus + 1);
			else if (focus) expand(true);
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
	},[size, expanded, expand, currentFocus, setCurrentFocus, close, onChange]);

	useEffect(() => {
		document.addEventListener("keydown", handleKeyDown, false);
		return () => {
			document.removeEventListener("keydown", handleKeyDown, false);
		};
	}, [handleKeyDown]);

	return [currentFocus, setCurrentFocus];
};