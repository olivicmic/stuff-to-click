import React, {useState, useEffect}  from 'react';

export default function HexInput({value, onChange, ...rest}) {
	const [local, setLocal] = useState(value.slice(1));
	const hexRegex = new RegExp(/^[0-9A-F]+$/i);

	useEffect(() => setLocal(value.slice(1)), [value]);

	const onKeyPress = e => { if (!hexRegex.test(e.key)) e.preventDefault(); };

	const handleChange = e => {
		if (e.currentTarget.value.length === 6) onChange('#' + e.currentTarget.value);
		setLocal(e.currentTarget.value);
	}

	return (
		<input {...rest} className="stuff-hex-input" type="text" value={local} onChange={handleChange} onKeyPress={onKeyPress} maxLength="6" pattern='/^[0-9A-F]+$/i'/>
	);
};