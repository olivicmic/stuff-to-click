import React, { useEffect, useRef, useState } from "react";
import DropDown  from '../DropDown';
//import useDropDown from './useDropDown';
import useInput from './useInput';
import './SlideWrapper.scss';

const SlideWrapper = ({ component, bar, dropdown, id, label, list, listStyle, name, onChange = () => {}, onClick = () => {}, required, set = [], style, valid, value, debug, ...rest}) => {
	//console.log(document.activeElement);
	const [host, setHost] = useState();
	const [kid, setKid] = useState();
	const [glob, setGlob] = useState(false);
	const hostRef = useRef(null);
	const kidRef = useRef(null);
	//const host = hostRef;

	useEffect(() => {
 		if ( hostRef && !host) {
 			//console.log(hostRef, 'ahppun');
 			setHost(hostRef.current);
 		}
 	}, [hostRef, host]);

	useEffect(() => {
		if ( kidRef && !kid) {
			//console.log(hostRef, 'ahppun');
			setKid(kidRef.current);
		}
	}, [kidRef, kid]);

	useEffect(() => {
		//console.log(kid, document.activeElement);
 		if (!glob && kid === document.activeElement) {
 			//console.log('SETTING GLOB TRUE ooor');
 			setGlob(true);}
 		else if (glob) setGlob(false);
 	}, [kid, document.activeElement]);
/*
 	useEffect(() => {
		if (glob) console.log('echoed from: ' + id, document.activeElement);
	}, [glob]);
*/
	const { inProps, labelClass, mainClass, onBlur, onFocus } = useInput({ valid, value });
	const [active, setActive] = useState(false);
/*	const { hostRef, open, ...dropProps } = useDropDown({ ...inProps, debug, dropdown, options: list, name, onChange, set, value }); */

	const click = () => setActive(true);

	const sharedAttr = { debug, id, set, name, onChange, value };

	const focusChild = () => {
		kidRef.current && kidRef.current.focus()
	}; // MIGHT BE IT?

	return <React.Fragment>
		<div className={mainClass} style={style} ref={hostRef} key={id} id={id} onClick={focusChild}>
			<label htmlFor={id} className={labelClass} name={name + ' label'}>
				{ label }
				{required ? <div className="stuff-slide-input-required"></div> : null}
			</label>
			{component({ ...rest, ...sharedAttr,  onClick: click, kidref: kidRef, onBlur, onFocus, required })}
			{ bar ? <div className='stuff-slide-bar' style={bar}></div> : null }
		</div>
		{ dropdown && host && kid && set ? <DropDown { ...{...sharedAttr, ...inProps, active, dropdown, glob, host, hostRef, kid, listStyle, options: list, setActive  }} /> : null }
	</React.Fragment>;
};

export default SlideWrapper;