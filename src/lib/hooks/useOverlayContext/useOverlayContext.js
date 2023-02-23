import { useContext } from 'react';
import { OverlayContext } from '../..';

export default function useOverlayContext() {
	return useContext(OverlayContext);
};