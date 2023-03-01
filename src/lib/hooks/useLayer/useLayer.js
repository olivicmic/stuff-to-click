import { useEffect, useState } from 'react';
import { generateUnique } from 'lal';
import { useBusy } from 'hangers';
import { modifyOpen } from '../..';
import { configure, filterID } from './layerTools';

export default function useLayer(layerName, mainTint = {}, presets = {}, debug) {
	const [arrival, arrivalSet] = useState(); // new modals configs are place here, then added to items by useEffect below
	const [items, setItems] = useState([]); // core overlay array, which includes live overlays and their base props
	const [data, dataSet] = useState({}); // overlay data object corresponding to 'items' via overlay id keys
	const [completed, completedSet] = useState([]); // overlays removed from 'items' animating out of view
	const [trash, trashSet] = useState(); // overlays that have animated out of view with data to be trashed
	const [order, orderSet] = useState([]); // overlays visual ordering, with most recently selected at the end/top
	const [tintTriggers, tintTriggersSet] = useState([]); // overlays which have enabled the tint
	const [layerLock, layerLockSet] = useState(); // if true, no other overlays within this layer will open
	const [busy, busySet] = useBusy({});
	const top = order[order.length - 1];

	const add = (config, toDo) => arrivalSet([config, toDo]);

	const open = (type, inSetup) => {
		let { target, ...event } = inSetup  || {};
		let [preConfig, preModify, preOpened, preClosed, preDebug, preProps] = configure(presets[type] || {});
		let [eventConfig, eventModify, eventOpened, eventClosed, eventDebug, eventProps] = configure(event || {});
		let modify = preModify || eventModify || modifyOpen;
		if (presets[type]) add({
			...preProps,
			...eventProps,
			...modify({ debug: debug || preDebug || eventDebug, eventConfig, preConfig, target }), preClosed, eventClosed 
		}, j => { eventOpened(j); preOpened(j); });
	};
	
	const update = (id, d) => { if (top === id) { dataSet({ ...data, [id]: { ...data[id], ...d, } }) }};

	const currentSet = inputID => orderSet([ ...filterID([...order], inputID), inputID]);

	const remove = inputID => {
		setItems(filterID([...items], inputID));
		completedSet([...completed, ...inputID && [inputID] ]);
	}

	const clean = (busy, item) => !items.find((entry,i) => entry.overlayID === item.overlayID) && trashSet(item);

	const tinter = (busy, item) => {
		let tintLayer = mainTint.state[layerName] || [];
		if (completed.find(id => id === item.overlayID)) {
			let newLayerTint = tintLayer.filter((ni,i) => ni !== item.overlayID);
			let newTinted = { ...mainTint.state };
			delete newTinted[layerName];
			if (!!newLayerTint.length) newTinted[layerName] = newLayerTint;
			mainTint.set(newTinted);
		} else if (!!tintTriggers.length) {
			mainTint.set({ ...mainTint.state, [layerName]: [ ...tintLayer, item.overlayID ] });
		}
	};

	useEffect(() => {
		if (arrival) {
			let [{ initial, lockLayer, tint, ...arrivingItem }, toDo = () => {}] = arrival;
			if (!layerLock) {
				let overlayID = generateUnique({ charCount: 5 });
				if (tint) tintTriggersSet([ ...tintTriggers, overlayID ]);
				if (lockLayer) layerLockSet(true);
				orderSet([ ...order, overlayID ]);
				setItems([ ...items, { ...arrivingItem, lockLayer, overlayID }]);
				dataSet({ ...data, [overlayID]: initial });
				toDo(overlayID);
			}
			arrivalSet();
		}
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
	},[arrival, completed, data, layerLock, items, tintTriggers, trash, order]);


	return {
		[layerName]: { add, busy, busySet, clean, completed, currentSet, data, items, layerName, open, order, remove, tinter, tintTriggers, top, update }
	};
};