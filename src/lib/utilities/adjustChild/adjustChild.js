export default function adjustChild(current = {} ,child) {
	const dim = [current.clientWidth || 0, current.clientHeight || 0];
	const mainPos = [current.offsetLeft || 0, current.offsetTop || 0];
	const alignment = [child.alignX || 0, child.alignY || 0 ];
	const alignPos = ax => (mainPos[ax] - ( dim[ax] * ( .01 * alignment[ax] ))) || 0;
	const edge = [alignPos(0) + dim[0], alignPos(1) + dim[1]];
	return { alignment, alignPos, dim, edge, mainPos };
};