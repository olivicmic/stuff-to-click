import React from 'react';
import { ModalContext } from '../Context';
import Modal from '../Modal';
import ModalTrigger from '../ModalTrigger';
import useModalState from './useModalState';
import './ModalView.scss'


export default function ModalView({ children }) {
	const { modals, ...rest  } = useModalState();
	const modalList = modals.map(( item, i ) => <Modal{ ...{
		...item,
		key: i, 
		modals,
		position: i, 
		...rest
	} }/>);

	return <ModalContext.Provider value={{ modals, ...rest }}>
		{ children }
		{modals.length !== 0 ? <div className='stuff-modal-view'>
			<ModalTrigger />
			{ modalList }
		</div> : null}
	</ModalContext.Provider>;
};