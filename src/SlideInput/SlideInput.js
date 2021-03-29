import React, {useState} from "react";
import SlideWrapper  from '../SlideWrapper';
const Input = ({focus, extra: Extra, type = 'text', valueName, ...rest}) => 
<div className='stuff-slide-input-content'>
	<input type={type} {...rest}/>
	{ Extra ? <Extra className='stuff-slide-input-extra'/> : null }
</div>;

const SlideInput = ({ ...rest}) => {
	
	return(
		<SlideWrapper {...rest} component={Input}/>
	);
};

export default SlideInput;