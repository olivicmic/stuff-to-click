import { useEffect, useState } from 'react';

export default function useInput({ valid, value }) {
	const [focus, toggleFocus] = useState(false);
	const [valueName, setValueName] = useState(null);
	const onFocus = () => toggleFocus(true);
	const onBlur = () => toggleFocus(false);
	const cls = ['','-active','-error','-label','-label-raised','-label-error'].map(item => 'stuff-slide-input' + item);
	const isValid = (valid === undefined ) ? true : valid;
	const errClass = (theClass) => isValid ? '' : cls[theClass];
	const mainClass = `${cls[0]} ${focus ? cls[1] : ''} ${errClass(2)}`;
	const labelRaise = (focus || value) ? cls[4] : '';
	const labelClass = `${cls[3]} ${labelRaise} ${errClass(5)}`;

	return { focus, labelClass, mainClass, onBlur, onFocus, setValueName, valueName };
};