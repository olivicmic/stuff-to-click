import { useRef } from 'react';
import { useStateRef } from 'hangers';

export default function useOverlayAnchor() {
	const body = document.body;
	const ref = useRef();
	const box = ref?.current?.getBoundingClientRect() || { left: 0, top: 0 };
	const scrollTop = window.pageYOffset || ref?.current?.scrollTop || body.scrollTop;
    const scrollLeft = window.pageXOffset || ref?.current?.scrollLeft || body.scrollLeft;
    const client = [ref?.current?.clientLeft || body.clientLeft || 0, ref?.current?.clientTop || body.clientTop || 0];
	const host = {
		gap: ref?.current ? 
			parseInt(getComputedStyle(ref.current).getPropertyValue('font-size').slice(0,-2)) / 2 : 0,
		height: ref?.current?.offsetHeight || 0,
		width: ref?.current?.offsetWidth || 0,
		x: box.left + scrollLeft - client[0] || 0,
		y: box.top +  scrollTop - client[1] || 0 
	};

	return { host, setHost: ref };
};