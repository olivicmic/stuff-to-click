import React, { useState } from 'react';
import SlideWrapper  from '../SlideWrapper';
import Selection  from '../Selection';
import FauxOption  from '../DropDown/FauxOption';
import useInput from '../SlideWrapper/useInput';
import useKeySelect from './useKeySelect';
import useSelectState  from './useSelectState';
import './FauxSelect.scss'

const SlideInput = ({ debug, disabled, name, id, onChange, tabIndex, value, set = [], ...rest }) => {
	const hiddenList = set && set.map((item,i) => <option value={item.value} key={i}>{item.label}</option>);
	const list = props => set.map((item, key) => <FauxOption { ...{ ...props, item, key, position: key } }/>);
	const { keyInput, wrapProps, ...selState } = useInput({ list, name, onChange, set, value });
	const attrSet = { disabled, id, name, tabIndex, value };

	return <SlideWrapper key='boom' { ...{ ...rest, ...wrapProps, disabled, name, id, tabIndex, value, set, selState }} dropdown component={( comProps ) => {
		return <React.Fragment>
				<Selection {...{...attrSet, ...comProps, onKeyDown: keyInput, onKeyUp: keyInput }} key='boops' />
				<select {...{ disabled, name, onChange, tabIndex, value, key: 'native'}} >
					<option value={null} disabled={true}> </option>
					{hiddenList}
				</select>
			</React.Fragment > }} />
};

export default SlideInput;