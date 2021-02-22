import React, {useState} from "react";
import SlideWrapper  from '../SlideWrapper';
const Input = ({focus, type = 'text', valueName, ...rest}) => <input type={type} {...rest}/>;

const SlideInput = ({ ...rest}) => {
	
	return(
		<SlideWrapper {...rest} component={Input}/>
	);
};

export default SlideInput;