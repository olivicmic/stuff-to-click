import { useEffect, useState } from 'react';

export default function useActiveElement(props) {
	const [active, setActive] = useState(document.activeElement);
	const handleFocusIn = (e) => setActive(document.activeElement);

	useEffect(() => {
		document.addEventListener('focusin', handleFocusIn);
		return () => document.removeEventListener('focusin', handleFocusIn);
	}, []);

	return active;
};

// source: https://stackoverflow.com/questions/58886782/how-to-find-focused-react-component-like-document-activeelement