import React, {useState} from "react";
import SlideWrapper  from '../SlideWrapper';
const Input = ({...rest}) => <input {...rest}/>;

const SlideInput = ({ ...rest}) => {
	
	return(
		<SlideWrapper {...rest} component={Input}/>
	);
};

export default SlideInput;