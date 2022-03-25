import { useKeyInput } from 'hangers';

export default function useKeySelect({ active, close, count, focus, index, open, setIndices, submit }) {
	const keySet = {
		'9': { keydown: () => close() },
		'13': { keyup: e => { // enter released
			e.preventDefault();
			submit(index);
			close();
		}},
		'38': { keydown: e => {
			e.preventDefault();
			console.log('is active', active);
			if (active) {
				console.log('ACTIVE, UP KEY, NEW INDEX');
				setIndices(index <= 0 ? 0: index - 1);
			} // up limit
			else if (focus) {
				console.log('IN FOCUS, UP KEY, OPENING');
				open();
			}
		}},
		'40': { keydown: e => {
			e.preventDefault();
			console.log('is active', active);
			if (active) {
				console.log('ACTIVE, DOWN KEY, NEW INDEX');
				setIndices(index === count - 1 ? index : index + 1);
				} // down limit
			else if (focus) { 
				console.log('IN FOCUS, DOWN KEY, OPENING');
				open(); 
			}
		}},
	};

	return useKeyInput({ keySet });
};