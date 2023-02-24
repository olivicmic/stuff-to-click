import { useMemo } from 'react';
import { is } from 'lal';

export default function useHost({ enter, exit, parent }) {
	return useMemo(() => {
		const align = which => Math.min(is.defined(parent?.[which],100),100);
		const alignment = [align('alignX'), align('alignY')];
		const size = [(parent?.width || 0) + (parent?.padX || 0), (parent?.height || 0) + (parent?.padY || 0)];
		const xy = [(parent?.x || 0) - ((parent?.padX / 2)|| 0), (parent?.y || 0) - ((parent?.padY / 2)|| 0)];
		const win = [window.innerWidth, window.innerHeight];
		const orient = ax => (xy[ax] + (size[ax] / 2)) > (win[ax] * [.75,.66][ax]) ? 1 : 0;
		return {
			alignment,
			gap: [parent?.gapX || 0, parent?.gapY || 0],
			orientation: [orient(0),orient(1)],
			size,
			win,
			xy,
		};
	},[parent]);
};
