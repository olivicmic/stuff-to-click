import React, { useState } from 'react';

export default function Selection({arrow: Arrow, focus, id, listStyle, value, valueName, ...rest}) {
	return(
		<div className='stuff-faux-select' {...rest} >
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
		</div>
	);
};