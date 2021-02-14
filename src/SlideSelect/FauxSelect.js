import React, { useState, useRef, useEffect } from 'react';

const outsideClose = (ref, close) => {
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (ref.current && !ref.current.contains(event.target)) {
				close();
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
		// Unbind the event listener on clean up
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [ref]);
};

export default function FauxSelect({ name, onChange, set, value, ...rest }) {
	const [expanded, toggle] = useState(false);
	const open = () => toggle(true);
	const close = () => toggle(false);

	const listRef = useRef(null);
	outsideClose(listRef, close);

	const optionList = set.map((item,i) => {
		return <option value={item.value} key={i}>{item.label}</option>
	});

	const makeChange = (item) => {
		onChange({ target: {...item, name: name}});
		close();
	};

	const fauxOptionList = set.map((item,i) => {
		return [
			<li value={item.value} key={'l' + i} onClick={() => makeChange(item)}>{item.label}</li>,
			<hr key={'h' + i} />
		];
	});

	return(
		<React.Fragment>
			<div className='faux-select' onClick={open}>
				<div className='faux-select-label'>
					{value}
				</div>
				<div className='arrow'></div>
			</div>			
			<ul className={`faux-select-list${expanded ? ' faux-select-list-open' : ''}`} ref={listRef}>
				{fauxOptionList}
			</ul>
			<select name={name} value={value} {...rest} onChange={onChange} >
				<option value={null} disabled> </option>
				{optionList}
			</select>
		</React.Fragment>
	);
};