import React, { useState } from 'react';

export default function Selection({active, arrow: Arrow, focus, id, kidRef, listStyle, value, valueName, ...rest}) {
	return <div className='stuff-faux-select' {...rest} key={id} ref={kidRef} >
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