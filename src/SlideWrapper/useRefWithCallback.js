// source: https://vzaidman.com
import { useCallback, useState } from 'react';
export default function useRefWithCallback(processNode = e => e) {
	const [node, setNode] = useState(null);
	const setRef = useCallback(newNode => setNode(processNode(newNode)), [processNode]);
	return [node, setRef];
}

// usage:
// const [clientHeight, setRef] = useStateRef(node => (node?.clientHeight || 0));
// 

// RENAME USESTATEREF OR WHATEVER