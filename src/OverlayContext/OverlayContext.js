import { createContext } from 'react';

const f = () => {};
export default createContext({
	addOverlay: f,
	deleteOverlay: f,
	overlays: [],
	overState: [],
	updateOverlay: f
});