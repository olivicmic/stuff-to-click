import React, { useContext } from 'react';
import { OverlayContext } from '../Context';

export default function ModalTrigger({}) {
	const { addModal, modals, cutModal, setKill } = useContext(OverlayContext);
	return <span>
			<button className='modal-trigger' onClick={() => addModal('hey')}>Add One</button>
			<button className='modal-trigger' onClick={() => setKill(modals.length - 1)}>Remove One</button>
		</span>;
};