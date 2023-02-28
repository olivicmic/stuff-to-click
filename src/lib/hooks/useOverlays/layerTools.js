const configure =  ({ 
	child,
	parent, 
	modifyOpen: m,
	onOpened: o = n => n,
	onClosed: c = n => n,
	debug: d,
	...obj
}) => [{ child, parent }, m, o, c, d, obj];

const filterID = (arr, inputID) => arr.filter((overlay,i) => (overlay?.overlayID || overlay) !== inputID);
export { configure, filterID };