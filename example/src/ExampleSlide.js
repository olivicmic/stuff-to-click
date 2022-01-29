import React, { useState } from 'react';

export default function ExampleSlide({ atStart, atEnd, back, busy, goTo, num, page, value, forward, ...more }) {
	const [reqPg, setReqPg] = useState(0);
	return <div>
		<button onClick={back} disabled={atStart || busy}>Back</button>
		<button onClick={forward} disabled={atEnd || busy}>Next</button>
		<div>
			<div>Busy: {`${busy}`}</div>
			<div>{ num + ': ' + value }</div>
			<input type='number' value={reqPg} onChange={e => setReqPg(e.target.value)} disabled={busy}/>
			<button onClick={() => goTo(reqPg)} disabled={busy}>Go to page</button>
		</div>			
	</div>;
};