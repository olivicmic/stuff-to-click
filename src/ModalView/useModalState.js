import { useEffect, useState } from 'react';
import { generateUnique } from 'lal';
import { useStateRef } from 'hangers';

export default function UseModalState() {
	const [current, setCurrent] = useState();
	const [modals, modModal] = useState([]);
	const [modState, setModState] = useState([]);
	const [killList, setKillList] = useState([]);
	console.log('❇️', modals, modState);
	const setModals = (s, type) => { console.log('✴️ !!! Core modal change', type, s); modModal(s); }

	const addModal = ({ state, ...rest  }) => {
		let modID = generateUnique({ charCount: 5 });
		let position = modState.length;
		setCurrent(position);
		setModals([ ...modals, { ...rest, modID, position, fade: 0}], 'NEW MODAL');
		setModState([ ...modState, { ...state }])
		console.log('➕ useModalState.js, New modal made', modID, modals, modState);
	};
	const updateModal = (index, d) => {
		console.log('UPDATING MODAL 😶‍🌫️', index, d);
		let newState = modState.map((state, i ) =>
			current === i ? { ...state, ...d, from: [0,0], fade: 1, index} : state 
		);
		console.log(current, d, newState);
		setModState(newState, 'UPDATE MODAL');
	}

	const [trash, setTrash] = useState(false);
	const  timer1 = () => setTimeout(() => {
		if (modals.length === 0) setTrash(true);
	}, 1000);
	useEffect(() => {

		if (modals.length === 0 && modState.length > 0 && !trash) {
			console.log('🧭 length mismatch, cleaning timer started', modals, modState);
			timer1();
		} else { clearTimeout(timer1); }
		if (modals.length === 0 && trash) {
			console.log('time elapsed, clearning modals 😨', modals, modState);
			setTrash(false);
			setModState([]);
			setCurrent();
		} else if (modState.length > 0 && trash) {
			console.log('modal state spared 😮‍💨');
			setTrash(false);
		}

		return () => { clearTimeout(timer1); }
	}, [modals, modState, trash]);

	const deleteModal = which => setModals([...modals].filter((modal, i) => i !== modals.length - 1), 'DELETING MODAL: ' + which);

	return { addModal, current, deleteModal, modals, modState, updateModal };
};