import { useEffect, useState } from 'react';
import { generateUnique } from 'lal';

export default function useOverlays() {
	const [current, setCurrent] = useState();
	const [items, setItems] = useState([]);
	const [state, setState] = useState([]);
	const [trash, setTrash] = useState(false);

	const add = ({ initial, ...rest  }, toDo = () => {}) => {
		let overlayID = generateUnique({ charCount: 5 });
		let position = state.length;
		setCurrent(position);
		setItems([ ...items, { ...rest, overlayID, position, fade: 0}]);
		setState([ ...state, { ...initial }]);
		toDo(overlayID);
	};
	const update = (index, d) => setState(state.map((state, i ) =>
		current === i ? { ...state, ...d, from: [0,0], fade: 1, index} : state 
	));
	const remove = which => setItems([...items].filter((modal, i) => i !== items.length - 1));

	const timer1 = () => setTimeout(() => {
		if (items.length === 0) setTrash(true);
	}, 1000);

	useEffect(() => {
		if (items.length === 0 && state.length > 0 && !trash) {
			timer1();
		} else { clearTimeout(timer1); }
		if (items.length === 0 && trash) {
			setTrash(false);
			setState([]);
			setCurrent();
		} else if (state.length > 0 && trash) setTrash(false);

		return () => { clearTimeout(timer1); }
	}, [items, state, trash]);

	return { add, current, items, remove, state, update };
};