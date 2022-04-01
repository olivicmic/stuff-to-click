import React, { useEffect  } from 'react';
import { useTransition, easings, config } from 'react-spring';
import { ModalContext } from '../Context';
import { useActiveElement } from '../hooks';
import Modal from '../Modal';
import ModalTrigger from '../ModalTrigger';
import useModalState from './useModalState';
import './ModalView.scss'


export default function ModalView({ children }) {
	const { modals, ...rest  } = useModalState();
	  const transitions = useTransition(modals, {
		from: { opacity: 0 },
		enter: { opacity: 1 },
		leave: { opacity: 0 },
		config: config.gentle,
	});
 /*
	    const focusedElement = useActiveElement();
 
	useEffect(() => {
		if (focusedElement) {
			focusedElement.value && console.log('🍔 Active element', focusedElement.value);
		}
		console.log(focusedElement);
	}, [focusedElement]);
*/
	return <ModalContext.Provider value={{ modals, ...rest }}>
		{ children }
		<div className='stuff-modal-view'>
			{ transitions(({ opacity }, modal) => <Modal{ ...{
			...modal,
			modals,
			opacity,
			...rest
		} }/> ) }
		</div>
	</ModalContext.Provider>;
};