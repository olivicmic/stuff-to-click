// import invert from '../invert';

export default function adjustChild(current = {} , child, xy = [], orientation, fixed) {
	const dim = [current.clientWidth || 0, current.clientHeight || 0];
	const alignment = [child.alignX || 0, child.alignY || 0 ];
	
	const align = (ax, fl) => dim[ax] * ( fl ? 
		( .01 * alignment[ax] ) : // flipped - right > left / bottom > top
		(1 - (.01 * alignment[ax])) // base - left > right / top > bottom 
	);
	
	const findEdge = ax => (xy[ax] + align(ax, orientation[ax] ));
	const findEdgeNW = ax => (xy[ax] - align(ax, !orientation[ax] ));

	const edge = [ findEdge(0), findEdge(1)];
	const edgeNW = [ findEdgeNW(0), findEdgeNW(1)];

	return { alignment, findEdge, dim, edge, edgeNW };
};