import React, { useState } from 'react';
import { useInOut, useKeyInput, useStateRef } from 'hangers';
import SlideWrapper  from '../SlideWrapper';
import Selection  from '../Selection';
import FauxOption  from '../DropDown/FauxOption';
import useInput from '../SlideWrapper/useInput';
import useKeySelect from './useKeySelect';
import useSelectState  from './useSelectState';
import useAnimatedDrop  from '../DropDown/useAnimatedDrop';
import './FauxSelect.scss'

const SlideInput = ({ debug, disabled, name, id, onChange, tabIndex, value, set = [], ...rest }) => {
	const [index, setIndex] = useState(set.indexOf(value));
	const hiddenList = set && set.map((item,i) => <option value={item.value} key={i}>{item.label}</option>);
	const list = props => set.map((item, key) => <FauxOption { ...{ ...props, item, key, position: key } }/>);
	const attrSet = { disabled, id, name, tabIndex, value };	
	const { focus, onRest, open, valueName, setValueName, events, ...selState } = useInput({ value });
	const [sprung, enter, exit] = useAnimatedDrop({ onRest });
	const close = func => {	setIndex(-1); exit(func);};
	const submit = y => onChange({ target: {...set[y], name }}) && setValueName(set[y].label);
	const [kid, kidRef] = useStateRef();
	const onFocus = () => kid?.focus() || {};

	useInOut({ ref: kid, onOut: () => close() });

	const keyInput = useKeySelect({ close, count: set.length, selState, focus, index, open, setIndex, submit });
	const items = list ? list({ close, index, onFocus, value, submit }) : null;
	
	return <SlideWrapper key='boom' { ...{ ...rest, disabled, id, name, tabIndex, value, set, focus, valueName, selState, events, sprung, enter, kidRef, onFocus, items }} dropdown component={( comProps ) => {
		return <React.Fragment>
				<Selection {...{...attrSet, ...comProps, onKeyDown: keyInput, onKeyUp: keyInput }} key='boops' />
				<select {...{ disabled, name, onChange, tabIndex, value, key: 'native'}} >
					<option value={null} disabled={true}> </option>
					{hiddenList}
				</select>
			</React.Fragment > }} />
};

export default SlideInput;