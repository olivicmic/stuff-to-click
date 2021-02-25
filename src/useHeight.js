import React, { useState, useEffect, useRef, useCallback, useLayoutEffect } from 'react';
import ResizeObserver from 'resize-observer-polyfill';

export default function useHeight({ on = true /* no value means on */ } = {}) {
	const ref = useRef();
	const [dim, set] = useState({height: 0});
	const heightRef = useRef(dim.height);
	const [ro] = useState(
		() =>
			new ResizeObserver(packet => {
				if (ref.current && heightRef.current !== ref.current.offsetHeight) {
					heightRef.current = ref.current.offsetHeight;
					console.log("haaa");
					set({...dim, height: ref.current.offsetHeight});
				}
			})
	);
	useLayoutEffect(() => {
		console.log('heee');
		if (on && ref.current) {
			console.log('hooo');
			set({...dim, height: ref.current.offsetHeight});
			ro.observe(ref.current, {});
		}
		return () => ro.disconnect();
	}, [on, ref.current]);

	const setDim = () => set({height: ref.current.offsetHeight});
	return [ref, dim, setDim];
}