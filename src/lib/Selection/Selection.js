import React from 'react';

export default function Selection({active, arrow: Arrow, events, focus, id, inputRef, listStyle, value, valueName, ...rest}) {
	//console.log('🎢',events);
	return <div className='stuff-faux-select' {...{ ...events, ...rest, key: id, ref: inputRef }}>
		<div className='stuff-select-value'>
			{ valueName || value || '' }
		</div>
		{
			Arrow ?
				<Arrow className='stuff-select-marker'/> :
				<div className='stuff-select-marker'>
					<div className='stuff-faux-arrow'></div>
				</div>
		}
	</div>;
};