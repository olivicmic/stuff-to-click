export default function useSelectEvents(close, setActive, setFocus, toDo) {
	return {
		onBlur: () => { setFocus(false); close() },
		onClick: () => setActive(true) && toDo(),
		onFocus: () => setFocus(true)
	};
};