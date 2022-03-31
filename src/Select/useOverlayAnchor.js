import { useStateRef } from 'hangers';

export default function useOverlayAnchor() {
	const body = document.body;
	const [host, setHost] = useStateRef();
	const box = host?.getBoundingClientRect() || { left: 0, top: 0 };
	const scrollTop = window.pageYOffset || host?.scrollTop || body.scrollTop;
    const scrollLeft = window.pageXOffset || host?.scrollLeft || body.scrollLeft;
    const client = [host?.clientLeft || body.clientLeft || 0, host?.clientTop || body.clientTop || 0];
	const xy = [ box.left + scrollLeft - client[0] || 0, box.top +  scrollTop - client[1] || 0];
	const size = [host?.offsetWidth || 0, host?.offsetHeight || 0];
	const yCenter = [xy[0], xy[1] + (size[1] / 2)];
	const font = host ? parseInt(getComputedStyle(host).getPropertyValue('font-size').slice(0,-2) ) : 0;
	const at = [xy[0], xy[1] + size[1] + (font / 2)];
	const from = [0, -(at[1] - yCenter[1])];
	const position = { at, from };

	return { font, position, setHost, size, xy };
};