import React, {useState} from "react";
import SlideWrapper  from '../SlideWrapper';
import SelectSwitch from './SelectSwitch';


const SlideInput = ({ ...rest}) => {
	return(
		<SlideWrapper {...rest} component={SelectSwitch}/>
	);
};

export default SlideInput;