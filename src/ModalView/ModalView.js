import React from 'react';
import { useTransition, easings, config } from 'react-spring';
import { ModalContext } from '../Context';
import Modal from '../Modal';
import ModalTrigger from '../ModalTrigger';
import useModalState from './useModalState';
import './ModalView.scss'


export default function ModalView({ children }) {
	const { modals, killed, ...rest  } = useModalState();
	  const transitions = useTransition(modals, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: config.gentle,
  })
	//console.log(killed);
	/*
	const modalList = modals.map(( item, i ) => {
		const isAlive = item.alive !== 0;
		console.log(item, item.alive, isAlive, i);
		//console.log('🚾', killed, item, isAlive);
		return isAlive ? <Modal{ ...{
			...item,
			key: i, 
			modals,
			position: i, 
			...rest
		} }/> : null;
	} );
*/
	return <ModalContext.Provider value={{ modals, ...rest }}>
		{ children }
		<div className='stuff-modal-view'>
			<ModalTrigger />
			{ transitions(({ opacity }, modal) => <Modal{ ...{
			...modal,
			modals,
			opacity,
			...rest
		} }/> ) }
		</div>
	</ModalContext.Provider>;
};