import { useMemo } from 'react';
import { is } from 'lal';

export default function useHost({ autoBoundary = 0, enter, exit, parent }) {
	return useMemo(() => {
		const align = which => Math.min(is.defined(parent?.[which],100),100);
		const alignment = [align('alignX'), align('alignY')];
		const win = [window.innerWidth, window.innerHeight];
		const origin = [parent?.x, parent?.y];
		const padding = [parent?.padX, parent?.padY];
		const parentSize = [parent?.width, parent?.height];
		const sizeSet = ax => (parentSize[ax]|| 0) + (padding[ax] || 0);
		const size = [sizeSet(0), sizeSet(1)];
		const setSpawn = ax => Math.min((origin[ax] || 0) - ((padding[ax] / 2)|| 0), win[ax] - autoBoundary);
		const xy = [setSpawn(0),setSpawn(1)];
		const orient = ax => (xy[ax] + (size[ax] / 2)) > (win[ax] * [.75,.66][ax]) ? 1 : 0;
		const gap = [parent?.gapX || 0, parent?.gapY || 0];
		const hostAlign = ax => size[ax] * (.01 * alignment[ax]);
		const positions = (ax, fl) => !fl ? 
			xy[ax] + hostAlign(ax) + gap[ax] :
			win[ax] - (xy[ax] + hostAlign(ax) + gap[ax]);

		return {
			alignment,
			gap,
			orientation: [orient(0),orient(1)],
			positions,
			size,
			win,
			xy,
		};
	},[autoBoundary, parent]);
};
