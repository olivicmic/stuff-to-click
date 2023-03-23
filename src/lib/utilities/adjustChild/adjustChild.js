// import invert from '../invert';

export default function adjustChild(current = {} , child, xy = [], orientation, fixed) {
	const dim = [current.clientWidth || 0, current.clientHeight || 0];
	const alignment = [child.alignX || 0, child.alignY || 0 ];
	
	const align = ax => dim[ax] * ( orientation[ax] ? 
		( .01 * alignment[ax] ) : // flipped - right > left / bottom > top
		(1 - (.01 * alignment[ax])) // base - left > right / top > bottom 
	);
	
	const findEdge =  ax => (xy[ax] + align(ax));

	const edge = [ findEdge(0), findEdge(1)];

	// console.log('📊',xy[0], dim[0], align(0),findEdge(0));

	return { alignment, findEdge, dim, edge };
};