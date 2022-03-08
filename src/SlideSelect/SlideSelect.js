import React, { useState } from 'react';
import { useKeyInput } from 'hangers';
import SlideWrapper  from '../SlideWrapper';
import Selection  from '../Selection';
import FauxOption  from '../DropDown/FauxOption';
import './FauxSelect.scss'

const SlideInput = ({ debug, disabled, name, pre = -1, id, onChange, tabIndex, value, set = [], ...rest }) => {
	const [index, setIndex] = useState(pre);
	const hiddenList = set && set.map((item,i) => <option value={item.value} key={i}>{item.label}</option>);
	const list = props => set.map((item, key) => <FauxOption { ...{ ...props, item, key, position: key } }/>);
	const attrSet = { disabled, name, onChange, set, tabIndex, value };

	const keySet = {
		'9': () => console.log('TAB PRESSED'),
		'13': () => console.log('enter PRESSED'),
		'38': () => console.log('UP PRESSED'),
		'40': () => console.log('DOWN PRESSED'), 
	};

	const keyInput = useKeyInput({ keySet, keydown: true });
	
	return <SlideWrapper key='boom' { ...{ ...rest, disabled, id, list, name, onChange, tabIndex, value, set }} dropdown component={( comProps ) => {
		return <React.Fragment>
				<Selection {...{...attrSet, ...comProps, id,  onKeyDown: keyInput, onKeyUp: keyInput }} key='boops' />
				<select {...{ disabled, name, onChange, tabIndex, value, key: 'native'}} >
					<option value={null} disabled={true}> </option>
					{hiddenList}
				</select>
			</React.Fragment > }} />
};

export default SlideInput;