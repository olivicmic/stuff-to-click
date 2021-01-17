import Chroma from 'chroma-js';

const IsolateChannel = (input) => Chroma([0,0,0].map((old,i) => (i == input.channel) ? input.color : old)).hex();

export default IsolateChannel;