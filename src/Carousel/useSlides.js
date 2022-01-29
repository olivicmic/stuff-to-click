import React, { useEffect, useState } from 'react';
import { useTransition, config } from 'react-spring';
import useBusy from './useBusy';

export default function useSlides({ axis='x', direction = 1, enter = {}, fade = 1, from = {}, leave = {}, override, page, paused, range = 100, spring = 'slot' }) {
	const springs = { 
		...config,
		slot: {
			mass: 1.75,
			tension: 300,
			friction: 25
		}, snap: {	
			friction: 7,
			tension: 231,
			mass: 0.4
		}
	};
	const phases = { enter, from, leave };
	const [busy, statusControls] = useBusy();
	const selAxis = ['x','y','xy'].indexOf(axis);
	const onOff = (rng, off) => paused ? off : rng;
	const invert = (order, flip, rng) => ((flip ? -1 : 1) * (order ? rng : -rng));
	const xyObj = (rng, flip, xy = 0) => {
		let inRng = invert(direction, flip, rng);
		let ax = num => xy === 2 || xy === num ? inRng + '%' : 0;
		return {
			transform: `translate3d(${ax(0)},${ax(1)},0)`
		};
	};
	const ways = ['from','leave'];
	const props = ['range', 'opacity'];
	const keyStyle = (phase) => {
		let obj = phases[phase];
		let way = ways.indexOf(phase);
		let isEnter = way === -1;
		const value = (base, attr) => onOff(isEnter ? base : Number.isInteger(obj[props[base]]) ? obj[props[base]] : attr, base);
		return {
			position: isEnter ? 'relative' : 'absolute',
			opacity: value(1, fade),
			...xyObj(value(0, range), isEnter ? 1 : way, selAxis) 
		};;
	};
	const makeStyles = () => Object.fromEntries(['enter', ...ways].map((item,i) => [ item, keyStyle(item) ]));
	const transitions = useTransition(page, {
		...makeStyles(),
		...statusControls,
		config: springs[spring] || spring || springs['slot'],
		keys: null,
		...override
	});

	return { busy, transitions };

};