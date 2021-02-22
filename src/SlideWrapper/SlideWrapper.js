import React, {useEffect, useRef, useState} from "react";
import DropDown  from '../DropDown';
import './SlideWrapper.scss';

const SlideWrapper = ({ component: Component, bar, dropdown, id, label, name, onChange, required, set, style, type, valid, value, debug, ...rest}) => {
	const [focus, toggleFocus] = useState(false);
	const [listOffset, setOffset] = useState(0);
	const [valueName, setValueName] = useState(null);
	const [expanded, toggleExpand] = useState(false);
	const expand = () => toggleExpand(!expanded);
	const open = () => toggleExpand(true);
	const close = () => toggleExpand(false);
	const isValid = (valid === undefined ) ? true : valid;
	const onFocus = () => toggleFocus(true);
	const onBlur = () => toggleFocus(false);
	const classes = [
		'stuff-slide-input',
		'stuff-slide-input-active',
		'stuff-slide-input-error',
		'stuff-slide-input-label',
		'stuff-slide-input-label-raised',
		'stuff-slide-input-label-error'
	];
	const errClass = (theClass) => isValid ? '' : classes[theClass];
	const mainClass = `${classes[0]} ${focus ? classes[1] : ''} ${errClass(2)}`;
	const labelRaise = (focus || value) ? classes[4] : '';
	const labelClass = `${classes[3]} ${labelRaise} ${errClass(5)}`;
	const selRef = useRef(null); //sel
	const sharedAttr = { set: set, name, focus, onChange, value };

	useEffect(() => {
		setOffset(selRef.current.offsetLeft);
	},[selRef]);

	return(
		<React.Fragment>
		<div className={mainClass} style={style} ref={selRef}>
			<label htmlFor={id} className={labelClass} name={name + ' label'}>
				{label}
				{required ? <div className="stuff-slide-input-required"></div> : null}
			</label>
			<Component {...rest} {...sharedAttr} id={id} onBlur={onBlur} onFocus={onFocus} required={required} type={type}  valueName={valueName} onClick={open}/>
			{ bar ? <div className='stuff-slide-bar' style={bar}></div> : null }
		</div>
		{(dropdown && set) ? <DropDown {...sharedAttr} listOffset={listOffset} setValueName={setValueName} expanded={expanded} close={close} debug={debug}/> : null}
		</React.Fragment>
	);
};

export default SlideWrapper;