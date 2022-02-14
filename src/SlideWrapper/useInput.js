import { useEffect, useState } from 'react';

export default function useInput({ toDo = () => {}, valid, value }) {
	const [focus, setFocus] = useState(false);
	const [active, setActive] = useState(false);
	const [valueName, setValueName] = useState(null);
	const onBlur = () => setFocus(false);
	const onClick = () => setActive(true) && toDo();
	const onFocus = () => setFocus(true);

	return { inProps: { active, focus, setFocus, setActive, setValueName }, onBlur, onClick, onFocus,  valueName };
};