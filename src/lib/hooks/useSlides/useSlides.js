import { useTransition, config } from 'react-spring';
import { useBusy } from 'hangers';
import transform from './transform';

export default function useSlides({ axis='x', direction = 1, enter = {}, fade = 1, from = {}, leave = {}, onRest = () => {}, override, page, parentCtrls, paused, range = 100, spring = 'slot' }) {
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
	};	const [busy, slideCtrls] = useBusy({ onRest });
	const doDuo = onWhat => { parentCtrls[onWhat](); slideCtrls[onWhat](); };
	const phases = { enter, from, leave };
	const selAxis = ['x','y','xy'].indexOf(axis);
	const onOff = (rng, off) => paused ? off : rng;
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
			...transform(direction, value(0, 0), isEnter ? 1 : way, selAxis) 
		};;
	};
	const makeStyles = () => Object.fromEntries(['enter', ...ways].map((item,i) => [ item, keyStyle(item) ]));
	const transitions = useTransition(page, {
		...makeStyles(),
		config: springs[spring] || spring || springs['slot'],
		onStart: () => doDuo('onStart'),
		onRest: () => doDuo('onRest'),
		keys: null,
		...override
	});

	return { busy, transitions };
};