import React, { useContext } from 'react';
import ModalContext from '../Modal/modal-context';
export default function ModalTrigger({}) {
	const { addModal = () => {} } = useContext(ModalContext);
	return <button className='modal-trigger' onClick={() => addModal()}>Hey</button>;
};