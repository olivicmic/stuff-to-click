import React, { useEffect, useState } from 'react';
import { generateUnique } from 'lal';
import { ModalContext } from '../Context';
import Modal from '../Modal';
import ModalTrigger from '../ModalTrigger';
import './ModalView.scss'


export default function ModalView({ children }) {
	const [modals, setModals] = useState([]);
	const [kill, setKill] = useState(-1);
	const [modState, setMod] = useState([]);
	const [current, setCurrent] = useState(-1);
	const cutModal = i => {
		setMod([ ...modState ].filter((item, n) => n !== i));
		setModals([ ...modals ].filter((item, n) => n !== i));
		setCurrent(-1);
	};
	const addModal = ({ to = [0,0], from = [0,0], ...rest  }) => {
		let modID = generateUnique({ charCount: 5 });
		setMod([ ...modState, {} ]);
		setCurrent(modals.length);
		setModals([ ...modals, { ...{
			...rest,
			modID, 
			x: to[0],
			y: to[1]
		}}]);
	};
	const modalList = modals.map(( item, i ) => <Modal{ ...{
		...item,
		cutModal,
		key: i, 
		kill,
		modState,
		position: i, 
		setKill,
		setMod,
	} }/>);

	return <ModalContext.Provider value={{ addModal, current, cutModal, modals, modState, setKill, setMod, setModals }}>
		{ children }
		{modals.length !== 0 ? <div className='stuff-modal-view'>
			<ModalTrigger />
			{ modalList }
		</div> : null}
	</ModalContext.Provider>;
};