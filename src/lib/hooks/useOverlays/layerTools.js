const configure =  ({ 
	child,
	parent, 
	modifyOpen: m,
	onOpened: o = n => n,
	onClosed: c = n => n, 
	...obj
}) => [{ child, parent }, m, o, c, obj];

const filterID = (arr, inputID) => arr.filter((overlay,i) => (overlay?.overlayID || overlay) !== inputID);
export { configure, filterID };