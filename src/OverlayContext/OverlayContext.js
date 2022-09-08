import { createContext } from 'react';

const f = () => {};
const base = { add: f, items: [], remove: f, state: [], update: f };
export default createContext({ modal: { ...base }, overlay: { ...base } });