export default function adjustChild(current = {} , child, xy = [], orientation, fixed) {
	const dim = [current.clientWidth || 0, current.clientHeight || 0];
	const alignment = [child.alignX || 0, child.alignY || 0 ];

	const alignPos =  ax => (xy[ax] + // parent XY top-left corner plus ...
		( orientation[0] ?
			-( dim[ax] * (1 - (.01 * alignment[ax]) )) :  // flipped - right > left / bottom > top
			( dim[ax] * ( .01 * alignment[ax] )) // base - left > right / top > bottom
	));

	const edge = [
		alignPos(0) + ( orientation ? dim[0] : 0 ),
		alignPos(1) + ( orientation ? dim[1] : 0 )
	];

		console.log(orientation, xy, dim, edge);

	return { alignment, alignPos, dim, edge };
};