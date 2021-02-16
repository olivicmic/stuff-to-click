import React, {useRef, useState} from "react";
import './SlideWrapper.scss';

const SlideWrapper = ({ component: Component, bar, id, label, name, required, style, type, valid, value, ...rest}) => {
	const [focus, toggleFocus] = useState(false);
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

	return(
		<div className={mainClass} style={style}>
			<label htmlFor={id} className={labelClass} name={name + ' label'}>
				{label}
				{required ? <div className="stuff-slide-input-required"></div> : null}
			</label>
			<Component {...rest} id={id} name={name} focus={focus} onBlur={onBlur} onFocus={onFocus} required={required} type={type} value={value}/>
			{ bar ? <div className='stuff-slide-bar' style={bar}></div> : null }
		</div>
	);
};

export default SlideWrapper;