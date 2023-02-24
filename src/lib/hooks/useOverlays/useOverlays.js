import { useEffect, useState } from 'react';
import { generateUnique } from 'lal';
import { useBusy } from 'hangers';
import { modifyOpen as defaultOpen } from '../..';

export default function useOverlays(presets = {}, debug) {
	const [completed, completedSet] = useState([]);
	const [order, orderSet] = useState([]);
	const [items, setItems] = useState([]);
	const [data, dataSet] = useState({});
	const [trash, trashSet] = useState();
	const [tintReqs, tintReqsSet] = useState({});
	const [busy, busySet] = useBusy({});
	const top = order[order.length - 1];
	const filterID = (arr, inputID) => arr.filter((overlay,i) => (overlay?.overlayID || overlay) !== inputID);
	const tint = Object.values(tintReqs).find(t => t);
	const add = ({ disableTint, initial, ...rest  }, toDo = () => {}) => {
		let overlayID = generateUnique({ charCount: 5 });
		tintReqsSet({ ...tintReqs, [overlayID]: !disableTint });
		orderSet([ ...order, overlayID ])
		setItems([ ...items, { ...rest, overlayID }]);
		dataSet({ ...data, [overlayID]: initial });
		toDo(overlayID);
	};
	const open = (type, setup, toDo) => {
		let { config, modifyOpen = defaultOpen, ...preset } = presets[type] || {};
		if (presets[type]) add({
			...preset,
			...modifyOpen({ 
				...setup,
				...config && { baseConfig: config }
			}) 
		}, toDo);
	};
	
	const update = (id, d) => {
		if (top === id) {
			dataSet({ ...data, [id]: { ...data[id], ...d, } })
		}
	};
	const currentSet = inputID => orderSet([ ...filterID([...order], inputID), inputID]);

	const remove = inputID => {
		setItems(filterID([...items], inputID));
		completedSet([...completed, ...inputID && [inputID] ]);
	}

	const clean = (busy, item) => {
		let isAlive = items.map((entry,i) => entry.overlayID).indexOf(item.overlayID) > -1;
		if (!isAlive) {	
			trashSet(item.overlayID); 
		}
	};

	const spring = presets.spring;

	useEffect(() => {
		if (trash) {
			orderSet(filterID([...order], trash));
			completedSet(filterID([...completed], trash));
			let newData = { ...data };
			let newTint = { ...tintReqs };
			delete newData[trash];
			delete newTint[trash];
			dataSet(newData);
			tintReqsSet(newTint);
			trashSet();
		}
	},[completed, data, tintReqs, trash, order]);


	return { add, busy, busySet, clean, completed, currentSet, data, items, open, order, remove, spring, tint, top, update };
};