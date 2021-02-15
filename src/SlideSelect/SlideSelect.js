import React, {useState} from "react";
import SlideWrapper  from '../SlideWrapper';
import FauxSelect from './FauxSelect';


const SlideInput = ({ ...rest}) => {
	return(
		<SlideWrapper {...rest} component={FauxSelect}/>
	);
};

export default SlideInput;