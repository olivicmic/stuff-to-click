export default function transform(direction, range, invert, xy = 0)  {
	const negate = (order, flip, rng) => ((flip ? -1 : 1) * (order ? rng : -rng));
	let inRng = negate(direction, invert, range);
	let ax = num => xy === 2 || xy === num ? inRng + '%' : 0;
	return {
		transform: `translate3d(${ax(0)},${ax(1)},0)`
	};
};