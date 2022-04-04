import { useContext } from 'react';
import { OverlayContext } from '../Context';

export default function useOverlayContext() {
	return useContext(OverlayContext);
};