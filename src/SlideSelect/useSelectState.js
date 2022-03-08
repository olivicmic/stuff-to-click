import { useEffect, useState } from 'react';

export default function useSelectState({ setActive }) {
	const [expanded, setExpanded] = useState(false);
	const [rendered, setRendered] = useState(false);
	const onRest = () => {
		setRendered(false);
		setExpanded(false); 
		setActive(false);
	};
	return { expanded, setExpanded, rendered, setRendered, onRest };
};