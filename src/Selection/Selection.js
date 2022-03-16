import React from 'react';

export default function Selection({active, arrow: Arrow, events, focus, id, inputRef, listStyle, value, valueName, ...rest}) {
	return <div className='stuff-faux-select' {...{ ...events, ...rest, key: id, ref: inputRef }}>
		{
			Arrow ?
				<Arrow className='stuff-faux-select-marker'/> :
				<div className='stuff-faux-select-marker'>
					<div className='stuff-faux-arrow'></div>
				</div>
		}
	</div>;
};