import { useKeyInput } from 'hangers';

export default function useKeySelect({ active, close, count, focus, index, open, setIndices, submit }) {
	const keyAction = (e, i) => {
		e.preventDefault();
		if (active) setIndices(i);
		else if (focus) open();
	};

	const keySet = {
		'9': { keydown: () => close() }, // tab
		'13': { keyup: e => { e.preventDefault(); submit(index); }}, // enter released
		'38': { keydown: e => keyAction(e, index <= 0 ? 0: index - 1) }, // up
		'40': { keydown: e => keyAction(e, index === count - 1 ? index : index + 1) }, // down
	};

	return useKeyInput({ keySet });
};