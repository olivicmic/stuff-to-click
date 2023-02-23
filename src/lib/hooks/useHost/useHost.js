import { useMemo } from 'react';
import { is } from 'lal';

export default function useHost({ config, enter, exit }) {
	return useMemo(() => {
		const corner = [is.defined(config?.cornerX,1), is.defined(config?.cornerY,1)];
		const size = [(config?.width || 0) + (config?.padX || 0), (config?.height || 0) + (config?.padY || 0)];
		const xy = [(config?.x || 0) - ((config?.padX / 2)|| 0), (config?.y || 0) - ((config?.padY / 2)|| 0)];
		const win = [window.innerWidth, window.innerHeight];
		const orient = ax => (xy[ax] + (size[ax] / 2)) > (win[ax] * [.75,.66][ax]) ? 1 : 0;
		return {
			corner,
			enter: config?.enter || enter || [0,0],
			exit: config?.exit || exit || [0,0],
			gap: [config?.gapX || 0, config?.gapY || 0],
			orientation: [orient(0),orient(1)],
			size,
			win,
			xy,
		};
	},[config, enter, exit]);
};
