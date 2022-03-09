import React, { useState } from 'react';
import { useKeyInput } from 'hangers';
import SlideWrapper  from '../SlideWrapper';
import Selection  from '../Selection';
import FauxOption  from '../DropDown/FauxOption';
import useInput from '../SlideWrapper/useInput';
import useSelectState  from './useSelectState';
import useAnimatedDrop  from '../DropDown/useAnimatedDrop';
import './FauxSelect.scss'

const SlideInput = ({ debug, disabled, name, id, onChange, tabIndex, value, set = [], ...rest }) => {
	const [index, setIndex] = useState(set.indexOf(value));
	const hiddenList = set && set.map((item,i) => <option value={item.value} key={i}>{item.label}</option>);
	const list = props => set.map((item, key) => <FauxOption { ...{ ...props, item, key, position: key } }/>);
	const attrSet = { disabled, name, onChange, set, tabIndex, value };
	//console.log(rest);
	
	const [ { active, focus, valueName }, { setActive, setFocus, setValueName }, events ] = useInput({ value });
	const { expanded, onRest, ...selState } = useSelectState({ setActive });
	const [sprung, enter, exit] = useAnimatedDrop({ onRest });
	const open = () => setActive(true);
	const close = func => {	setIndex(-1); exit(func); console.log('closed');};
	const count = set.length;
	const submit = y => onChange({ target: {...set[y], name }}) && setValueName(set[y].label);
	//console.log(controls);
	const keySet = {
		'9': { keydown: () => close() },
		'13': { keyup: e => { // enter released
			e.preventDefault();
			submit(index);
			close();
		}},
		'38': { keydown: e => {
			e.preventDefault();
			if (expanded) setIndex(index <= 0 ? 0: index - 1); // up limit
			else if (focus) open();
		}},
		'40': { keydown: e => {
			e.preventDefault();
			if (expanded) setIndex(index === count - 1 ? index : index + 1); // down limit
			else if (focus) open();
		}},
	};

	const keyInput = useKeyInput({ keySet });
	
	return <SlideWrapper key='boom' { ...{ ...rest, disabled, id, list, name, onChange, tabIndex, value, set, active, focus, valueName, index, selState, expanded, setFocus, setValueName, events, sprung, enter, exit, close }} dropdown component={( comProps ) => {
		return <React.Fragment>
				<Selection {...{...attrSet, ...comProps, id,  onKeyDown: keyInput, onKeyUp: keyInput }} key='boops' />
				<select {...{ disabled, name, onChange, tabIndex, value, key: 'native'}} >
					<option value={null} disabled={true}> </option>
					{hiddenList}
				</select>
			</React.Fragment > }} />
};

export default SlideInput;