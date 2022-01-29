import { useEffect, useState } from 'react';

export default function useBusy(props) {
	const [busy, setBusy] = useState(false);
	return [busy, {
		onStart: () => setBusy(true),
		onRest: () => setBusy(false)
	}];
};