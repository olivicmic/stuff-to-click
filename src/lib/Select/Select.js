import React from 'react';
import { InputWrap, Selection } from '..';
import useSelect from './useSelect';
import './Select.scss'

export default function Select({debug, disabled, name, id, onChange, tabIndex, type, value, options = [], ...rest }) {
	const hiddenList = options && options.map((item,i) => <option value={item.value} key={i}>{item.label}</option>);
	const { keyInput, wrapProps } = useSelect({ debug, id, name, onChange, options, type, value });
	const attrSet = { disabled, id, name, tabIndex, value };

	return <>
		<InputWrap { ...{ ...rest, ...wrapProps, disabled, name, id, tabIndex, value, type: 'select' }} dropdown component={comProps => <>
			<Selection {...{...attrSet, ...comProps, onKeyDown: keyInput, onKeyUp: keyInput }} />
			<select {...{ disabled, name, onChange, tabIndex, value, key: 'native'}} >
				<option value={null} disabled={true}> </option>
				{ hiddenList }
			</select>
		</> } />
	</>
};