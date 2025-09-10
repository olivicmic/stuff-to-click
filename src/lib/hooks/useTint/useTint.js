import { useState } from 'react';

export default function useTint(props) {
	const [initialized,initializedSet] = useState(false);
	const [state, stateSet] = useState({});

	const set = value => {
		if (!initialized) { initializedSet(true) }
		stateSet(value);
	};

	const active = !!Object.keys(state).length;
	const style = active && { position: 'fixed' };

	return { active, initialized, state, set, style };
};
