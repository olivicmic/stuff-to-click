import { useState } from 'react';

export default function useTint(props) {
	const [state, set] = useState({});

	return { active: !!Object.keys(state).length, state, set };
};
