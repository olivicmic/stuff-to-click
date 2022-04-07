import { useRef } from 'react';

export default function useOverlayAnchor() {
	const body = document.body;
	const setHost = useRef();
	const ref = setHost?.current;
	const box = ref?.getBoundingClientRect() || { left: 0, top: 0 };
    const scrollLeft = window.pageXOffset || ref?.scrollLeft || body.scrollLeft;
	const scrollTop = window.pageYOffset || ref?.scrollTop || body.scrollTop;
    const client = [ref?.clientLeft || body.clientLeft || 0, ref?.clientTop || body.clientTop || 0];
	const host = ref ? {
		gap: parseInt(getComputedStyle(ref).getPropertyValue('font-size').slice(0,-2)) / 2,
		height: ref.offsetHeight,
		width: ref.offsetWidth,
		x: box.left + scrollLeft - client[0],
		y: box.top +  scrollTop - client[1] 
	} : { gap: 0, height: 0, width: 0, x: 0, y: 0 };

	return { host, setHost };
};