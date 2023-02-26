import { useEffect, useState } from 'react';
import { generateUnique } from 'lal';
import { useBusy } from 'hangers';
import { modifyOpen } from '../..';
import { configure, filterID } from './layerTools';
const n = o => o;

export default function useOverlays(presets = {}, debug) {
	const [items, setItems] = useState([]); // core overlay array, which includes live overlays and their base props
	const [data, dataSet] = useState({}); // overlay data object corresponding to 'items' via overlay id keys
	const [completed, completedSet] = useState([]); // overlays removed from 'items' animating out of view
	const [trash, trashSet] = useState(); // overlays that have animated out of view with data to be trashed
	const [order, orderSet] = useState([]); // overlays visual ordering, with most recently selected at the end/top
	const [tintTriggers, tintTriggersSet] = useState([]); // overlays which have enabled the tint
	const [layerLock, layerLockSet] = useState(); // if true, no other overlays within this layer will open
	const tint = !!tintTriggers.length; // true if any overlay within this layer is enabling tint
	const [busy, busySet] = useBusy({});
	const top = order[order.length - 1];

	const add = ({ initial, lockLayer, tint, ...rest  }, toDo = n) => {
		if (!layerLock) {
			let overlayID = generateUnique({ charCount: 5 });
			if (tint) tintTriggersSet([ ...tintTriggers, overlayID ]);
			if (lockLayer) layerLockSet(true);
			orderSet([ ...order, overlayID ]);
			setItems([ ...items, { ...rest, lockLayer, overlayID }]);
			dataSet({ ...data, [overlayID]: initial });
			toDo(overlayID);
		}
	};

	const open = (type, { target, ...setup }) => {
		let [preConfig, preModify, preOpened, preClosed, preset] = configure(presets[type] || {});
		let [eventConfig, eventModify, eventOpened, eventClosed, event] = configure(setup || {});
		let modify = preModify || eventModify || modifyOpen;
		if (presets[type]) add(
			{ ...preset, ...event, ...modify({ eventConfig, preConfig, target }), preClosed, eventClosed },
			j => { eventOpened(j); preOpened(j); });
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

	const clean = (busy, item) => !items.find((entry,i) => entry.overlayID === item.overlayID) && trashSet(item);

	useEffect(() => {
		if (trash) {
			let { lockLayer, eventClosed, overlayID, preClosed } = trash;
			let newData = { ...data };
			delete newData[overlayID];
			if (lockLayer) layerLockSet();
			if (preClosed) preClosed(overlayID, data[overlayID]);
			if (eventClosed) eventClosed(overlayID, data[overlayID]);
			orderSet(filterID([...order], overlayID));
			completedSet(filterID([...completed], overlayID));
			tintTriggersSet(filterID([...tintTriggers], overlayID));
			dataSet(newData);
			trashSet();
		}
	},[completed, data, tintTriggers, trash, order]);


	return { add, busy, busySet, clean, completed, currentSet, data, items, open, order, remove, tint, top, update };
};