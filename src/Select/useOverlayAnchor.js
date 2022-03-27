import { useStateRef } from 'hangers';

export default function useOverlayAnchor() {
	const [host, setHost] = useStateRef();
	const xy = [host?.offsetLeft || 0, host?.offsetTop || 0];
	const size = [host?.offsetWidth || 0, host?.offsetHeight || 0];
	const yCenter = [xy[0], xy[1] + (size[1] / 2)];
	const font = host ? parseInt(getComputedStyle(host).getPropertyValue('font-size').slice(0,-2) ) : 0;
	const at = [xy[0], xy[1] + size[1] + font];
	const from = [0, -(at[1] - yCenter[1])];
	const position = { at, from };

	return { font, position, setHost, size, xy };
};