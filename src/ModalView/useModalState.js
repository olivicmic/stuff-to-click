import { useEffect, useState } from 'react';
import { generateUnique } from 'lal';
import { useStateRef } from 'hangers';

export default function UseModalState() {
	//const [kill, killModal] = useState([]);
	//const [killed, setKilled] = useState([]);
	const [current, setCurrent] = useState();
	const [modals, modModal] = useState([]);
	const [modState, setModState] = useState([]);
	const setModals = (s, type) => { console.log('✴️ Core modal change', type, s); modModal(s); }
	//const setKill = l => { let jam =  console.log(l); killModal([ ...kill, l ]); }

	const addModal = ({ state, ...rest  }) => {
		let modID = generateUnique({ charCount: 5 });
		let position = modals.length;
		setCurrent(position);
		setModals([ ...modals, { ...rest, modID, position, fade: 0}], 'NEW MODAL');
		setModState([ ...modState, { ...state }])
		console.log('➕ useModalState.js, New modal made', modID, modals);
	};
	const updateModal = (index, d) => {
		setModState(modState.map((state, i ) =>
			current === i ? { ...state, ...d, from: [0,0], fade: 1, index} : state 
		), 'UPDATE MODAL');
	}

	const deleteModal = (which, alive = 0) => {

		let newModals = [...modals].filter((modal, i) => i !== which);
		let newModState = [...modState].filter((state, i) => i !== which);
		setModals(newModals, 'DELETE MODAL');
		setModState(newModState);
	};

	//const cutModal = i => { console.log('killing', i); setKilled([ ...killed, i ]); };

	return { addModal, current, deleteModal, modals, modState, setModals, updateModal };
};