import { useContext } from 'react';
import { OverlayContext } from 'lib';

export default function useOverlayContext() {
	return useContext(OverlayContext);
};