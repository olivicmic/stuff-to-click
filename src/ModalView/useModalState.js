import { useEffect, useState } from 'react';
import { generateUnique } from 'lal';

export default function UseModalState() {
	const [current, setCurrent] = useState();
	const [modals, setModals] = useState([]);
	const [modState, setModState] = useState([]);
	const [trash, setTrash] = useState(false);

	const addModal = ({ state, ...rest  }) => {
		let modID = generateUnique({ charCount: 5 });
		let position = modState.length;
		setCurrent(position);
		setModals([ ...modals, { ...rest, modID, position, fade: 0}]);
		setModState([ ...modState, { ...state }]);
	};
	const updateModal = (index, d) => setModState(modState.map((state, i ) =>
		current === i ? { ...state, ...d, from: [0,0], fade: 1, index} : state 
	));
	const deleteModal = which => setModals([...modals].filter((modal, i) => i !== modals.length - 1));

	const timer1 = () => setTimeout(() => {
		if (modals.length === 0) setTrash(true);
	}, 1000);

	useEffect(() => {
		if (modals.length === 0 && modState.length > 0 && !trash) {
			timer1();
		} else { clearTimeout(timer1); }
		if (modals.length === 0 && trash) {
			setTrash(false);
			setModState([]);
			setCurrent();
		} else if (modState.length > 0 && trash) setTrash(false);

		return () => { clearTimeout(timer1); }
	}, [modals, modState, trash]);

	return { addModal, current, deleteModal, modals, modState, updateModal };
};