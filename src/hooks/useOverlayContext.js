import { useContext } from 'react';
import OverlayContext from '../OverlayContext';

export default function useOverlayContext() {
	return useContext(OverlayContext);
};