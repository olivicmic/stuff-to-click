import { useMemo } from 'react';
import { is } from 'lal';

export default function useHost({ enter, exit, parent }) {
	return useMemo(() => {
		const corner = [is.defined(parent?.cornerX,1), is.defined(parent?.cornerY,1)];
		const size = [(parent?.width || 0) + (parent?.padX || 0), (parent?.height || 0) + (parent?.padY || 0)];
		const xy = [(parent?.x || 0) - ((parent?.padX / 2)|| 0), (parent?.y || 0) - ((parent?.padY / 2)|| 0)];
		const win = [window.innerWidth, window.innerHeight];
		const orient = ax => (xy[ax] + (size[ax] / 2)) > (win[ax] * [.75,.66][ax]) ? 1 : 0;
		return {
			corner,
			gap: [parent?.gapX || 0, parent?.gapY || 0],
			orientation: [orient(0),orient(1)],
			size,
			win,
			xy,
		};
	},[parent]);
};
