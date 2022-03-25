import React from 'react';
import InputWrap  from '../InputWrap';
import Selection  from '../Selection';
import useSelect from './useSelect';
import './Select.scss'

export default function Select({ debug, disabled, name, id, onChange, tabIndex, value, set = [], ...rest }) {
	const hiddenList = set && set.map((item,i) => <option value={item.value} key={i}>{item.label}</option>);
	const { keyInput, wrapProps } = useSelect({ name, onChange, set, value });
	const attrSet = { disabled, id, name, tabIndex, value };

	return <React.Fragment>
		<InputWrap { ...{ ...rest, ...wrapProps, disabled, name, id, tabIndex, value, set, type: 'select' }} dropdown component={( comProps ) => <React.Fragment>
			<Selection {...{...attrSet, ...comProps, onKeyDown: keyInput, onKeyUp: keyInput }} />
			<select {...{ disabled, name, onChange, tabIndex, value, key: 'native'}} >
				<option value={null} disabled={true}> </option>
				{hiddenList}
			</select>
		</React.Fragment > } />
	</React.Fragment >
};