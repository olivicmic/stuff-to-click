import React, {useState} from "react";
import SlideWrapper  from '../SlideWrapper';
const Input = ({focus, icon: Icon, type = 'text', valueName, ...rest}) => 
<div className='stuff-slide-input-content'>
	<input type={type} {...rest}/>
	{ Icon ? <Icon className='stuff-slide-input-icon'/> : null }
</div>;

const SlideInput = ({ ...rest}) => {
	
	return(
		<SlideWrapper {...rest} component={Input}/>
	);
};

export default SlideInput;