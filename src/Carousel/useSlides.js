import { useTransition, config } from 'react-spring';

export default function useSlides({ axis='x', direction = 1, enter = {}, from = {}, leave = {}, page, paused, range = 100 }) {
	const selAxis = ['x','y','xy'].indexOf(axis);
	const onOff = (rng, off) => paused ? off : rng;
	const invert = (order, flip, rng) => ((flip ? -1 : 1) * (order ? rng : -rng));
	const xyObj = (rng, flip, xy = 0) => {
		let inRng = invert(direction, flip, rng);
		let ax = num => xy === 2 || xy === num ? inRng && inRng + '%' : 0;
		return {
			transform: `translate3d(${ax(0)},${ax(1)},0)`
		};
	};
	const ways = ['from','leave'];
	const keyStyle = (props) => {
		let way = ways.indexOf(props);
		let isEnter = way === -1;
		return {
			position: isEnter ? 'relative' : 'absolute',
			opacity: onOff([props].opacity || isEnter ? 1 : 0, 1),
			...xyObj(onOff([props].range || isEnter ? 0 : range, 0), isEnter ? 1 : way, selAxis) 
		}
	};
	const makeStyles = () => Object.fromEntries(['enter', ...ways].map((item,i) => [ item, keyStyle(item) ]));
	const transitions = useTransition(page, {
		...makeStyles(),
		config: config.gentle
	});
	return transitions;

};