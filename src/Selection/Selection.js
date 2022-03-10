import React from 'react';

export default function Selection({active, arrow: Arrow, events, focus, id, kidRef, listStyle, value, valueName, ...rest}) {
	return <div className='stuff-faux-select' {...{ ...events, ...rest }} key={id} ref={kidRef} >
		<div className='stuff-faux-select-label'>
			{ valueName || value || '' }
		</div>
		{
			Arrow ?
				<Arrow className='stuff-faux-select-marker'/> :
				<div className='stuff-faux-select-marker'>
					<div className='stuff-faux-arrow'></div>
				</div>
		}
	</div>;
};