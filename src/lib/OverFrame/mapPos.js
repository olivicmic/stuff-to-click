const mapPos = (a,b) => [[0,0],[0,0]].map((top, ax) => top.map((sub, fl) => ({
	position: a(ax,fl),
	asPx: b(ax,fl)
})));

export default mapPos;