import React, {useState} from "react";
import './SlideInput.scss';

const SlideInput = (props) => {
	const { autoComplete, autoFocus, bar, disabled, id, label, max, maxLength, min, minLength, name, onChange, readOnly, required, style, type, valid, value} = props;
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
			<label htmlFor={id} className={labelClass} name={name}>
				{label}
				{required ? <div className="stuff-slide-input-required"></div> : null}
			</label>
			<input	
				autoComplete={autoComplete}			
				autoFocus={autoFocus}				
				disabled={disabled}				
				id={id}
				max={max}
				maxLength={maxLength}
				min={min}
				minLength={minLength}
				name={name}
				onBlur={onBlur}
				onChange={onChange}
				onFocus={onFocus}
				required={required}
				readOnly={readOnly}
				type={type ? type : 'text'}
				value={value}
			/>
			{ bar ? <div className='stuff-slide-bar' style={bar}></div> : null }
		</div>
	);
};

export default SlideInput;