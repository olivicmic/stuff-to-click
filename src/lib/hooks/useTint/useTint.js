import { useState } from 'react';

export default function useTint(props) {
	const [state, set] = useState({});
	const active = !!Object.keys(state).length;
	const style = active && { position: 'fixed' };

	return { active, state, set, style };
};
