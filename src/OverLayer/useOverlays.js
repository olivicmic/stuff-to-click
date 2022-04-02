import { useEffect, useState } from 'react';
import { generateUnique } from 'lal';

export default function useOverlays() {
	const [current, setCurrent] = useState();
	const [overlays, setOverlays] = useState([]);
	const [overState, reOverState] = useState([]);
	const [trash, setTrash] = useState(false);

	const addOverlay = ({ state, ...rest  }) => {
		let overlayID = generateUnique({ charCount: 5 });
		let position = overState.length;
		setCurrent(position);
		setOverlays([ ...overlays, { ...rest, overlayID, position, fade: 0}]);
		reOverState([ ...overState, { ...state }]);
	};
	const updateOverlay = (index, d) => reOverState(overState.map((state, i ) =>
		current === i ? { ...state, ...d, from: [0,0], fade: 1, index} : state 
	));
	const deleteOverlay = which => setOverlays([...overlays].filter((modal, i) => i !== overlays.length - 1));

	const timer1 = () => setTimeout(() => {
		if (overlays.length === 0) setTrash(true);
	}, 1000);

	useEffect(() => {
		if (overlays.length === 0 && overState.length > 0 && !trash) {
			timer1();
		} else { clearTimeout(timer1); }
		if (overlays.length === 0 && trash) {
			setTrash(false);
			reOverState([]);
			setCurrent();
		} else if (overState.length > 0 && trash) setTrash(false);

		return () => { clearTimeout(timer1); }
	}, [overlays, overState, trash]);

	return { addOverlay, current, deleteOverlay, overlays, overState, updateOverlay };
};