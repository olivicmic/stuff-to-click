import React, { useState } from 'react';
import ModalContext from './modal-context';

const Box = ({}) => <div>Hello</div>;

export default function ModalView({ children }) {
	const [modals, setModals] = useState([Box]);
	const addModal = () => setModals([ ...modals, Box ]);
	const testModal = modals.map((Modal,i) => <Modal key={i} /> || null);
	return <ModalContext.Provider value={{ addModal, modals }}>
		{ children }
		<div className='stuff-modal-view'>
			{ testModal }
		</div>
	</ModalContext.Provider>;
};