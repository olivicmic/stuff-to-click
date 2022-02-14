import React from "react";
import SlideWrapper  from '../SlideWrapper';
import Selection  from '../Selection';
import FauxOption  from '../DropDown/FauxOption';
import './FauxSelect.scss'


const SlideInput = ({ debug, disabled, name, id, onChange, tabIndex, value, set = [], ...rest }) => {
	const hiddenList = set && set.map((item,i) => <option value={item.value} key={i}>{item.label}</option>);
	const list = props => set.map((item, key) => <FauxOption { ...{ ...props, item, key, position: key } }/>);
	const attrSet = { disabled, name, onChange, set, tabIndex, value };
	
	return <SlideWrapper key='boom' { ...{ ...rest, disabled, id, list, name, onChange, tabIndex, value, set }} dropdown component={({ ...comProps}) => {
		return <React.Fragment>
				<Selection {...{...attrSet, ...comProps, id}} key='boops' />
				<select {...{ disabled, name, onChange, tabIndex, value, key: 'native'}} >
					<option value={null} disabled={true}> </option>
					{hiddenList}
				</select>
			</React.Fragment > }} />
};

export default SlideInput;