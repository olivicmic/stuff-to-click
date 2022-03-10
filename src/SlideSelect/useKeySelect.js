import { useKeyInput } from 'hangers';

export default function useKeySelect({ close, count, selState, focus, index, open, setIndex, submit }) {
	const keySet = {
		'9': { keydown: () => close() },
		'13': { keyup: e => { // enter released
			e.preventDefault();
			submit(index);
			close();
		}},
		'38': { keydown: e => {
			e.preventDefault();
			if (selState.expanded) setIndex(index <= 0 ? 0: index - 1); // up limit
			else if (focus) open();
		}},
		'40': { keydown: e => {
			e.preventDefault();
			if (selState.expanded) setIndex(index === count - 1 ? index : index + 1); // down limit
			else if (focus) open();
		}},
	};

	return useKeyInput({ keySet });
};