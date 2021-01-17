import Chroma from 'chroma-js';

const IsolateChannel = (input) => {
	let isolateBase = [0,0,0];
	isolateBase[input.channel] = input.color;
	return Chroma(isolateBase).hex();
}

export default IsolateChannel;