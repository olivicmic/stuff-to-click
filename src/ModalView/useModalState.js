import { useEffect, useState } from 'react';
import { generateUnique } from 'lal';
import { useStateRef } from 'hangers';

export default function UseModalState() {
	const [modals, setModals] = useState([]);
	const [kill, setKill] = useState(-1);
	const [current, setCurrent] = useState(-1);
	const cutModal = i => {
		setModals([ ...modals ].filter((item, n) => n !== i));
		setCurrent(-1);
	};
	const addModal = ({ ...rest  }) => {
		let modID = generateUnique({ charCount: 5 });
		setCurrent(modals.length);
		setModals([ ...modals, { ...{
			...rest,
			modID,
		}}]);
	};

	return { addModal, current, cutModal, kill, modals, setKill, setModals };
};