import { useStateRef } from 'hangers';

export default function useOverlayAnchor() {
	const body = document.body;
	const [ref, setHost] = useStateRef();
	const box = ref?.getBoundingClientRect() || { left: 0, top: 0 };
	const scrollTop = window.pageYOffset || ref?.scrollTop || body.scrollTop;
    const scrollLeft = window.pageXOffset || ref?.scrollLeft || body.scrollLeft;
    const client = [ref?.clientLeft || body.clientLeft || 0, ref?.clientTop || body.clientTop || 0];
	const host = {
		font: ref ? parseInt(getComputedStyle(ref).getPropertyValue('font-size').slice(0,-2) ) : 0,
		height: ref?.offsetHeight || 0,
		width: ref?.offsetWidth || 0,
		x: box.left + scrollLeft - client[0] || 0,
		y: box.top +  scrollTop - client[1] || 0 
	};

	return { host, setHost };
};