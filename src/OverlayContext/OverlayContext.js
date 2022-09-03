import { createContext } from 'react';

const f = () => {};
export default createContext({
	addModal: f,
	addOverlay: f,
	deleteModal: f,
	deleteOverlay: f,
	modals: [],
	modalState: [],
	overlays: [],
	overState: [],
	updateModal: f
	updateOverlay: f
});