import React from 'react';
import SlideWrapper  from '../SlideWrapper';
import Selection  from '../Selection';
import DropDown  from '../DropDown';
import useInput from '../SlideWrapper/useInput';
import './FauxSelect.scss'

const SlideInput = ({ debug, disabled, name, id, onChange, tabIndex, value, set = [], ...rest }) => {
	const hiddenList = set && set.map((item,i) => <option value={item.value} key={i}>{item.label}</option>);
	const { host, items, keyInput, wrapProps, ...selState } = useInput({ name, onChange, set, value });
	const attrSet = { disabled, id, name, tabIndex, value };
	const shared = { debug, id, value };

	return <React.Fragment>
		<SlideWrapper key='boom' { ...{ ...rest, ...wrapProps, disabled, name, id, tabIndex, value, set }} dropdown component={( comProps ) => <React.Fragment>
			<Selection {...{...attrSet, ...comProps, onKeyDown: keyInput, onKeyUp: keyInput }} key='boops' />
			<select {...{ disabled, name, onChange, tabIndex, value, key: 'native'}} >
				<option value={null} disabled={true}> </option>
				{hiddenList}
			</select>
		</React.Fragment > } />
		{ host && set ? <DropDown { ...{...shared, selState, host, items }} /> : null }
	</React.Fragment >
};

export default SlideInput;