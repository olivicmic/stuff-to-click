import { useEffect, useState } from 'react';

export default function useInput({ valid, value }) {
	const [focus, setFocus] = useState(false);
	const [local, setLocal] = useState(value);
	const [valueName, setValueName] = useState(null);
	const onFocus = () => {setFocus(true); console.log('focus on');}
	const focusOff = () => {setFocus(false); console.log('focus off');}
	const cls = ['','-active','-error','-label','-label-raised','-label-error'].map(item => 'stuff-slide-input' + item);
	const isValid = (valid === undefined ) ? true : valid;
	const errClass = (theClass) => isValid ? '' : cls[theClass];
	const mainClass = `${cls[0]} ${focus ? cls[1] : ''} ${errClass(2)}`;
	const labelRaise = (focus || local) ? cls[4] : '';
	const labelClass = `${cls[3]} ${labelRaise} ${errClass(5)}`;

	return { focus, labelClass, mainClass, focusOff, onFocus, setFocus, setValueName, valueName, local, setLocal };
};