import React, { useState } from 'react';

export default function ExampleSlide({ busy, num, pagination, value, ...more }) {
	const [reqPg, setReqPg] = useState(0);
	const outBusy = busy.slideMask || busy.slideShift;
	return <div>
		<button onClick={pagination.back} disabled={pagination.atStart || outBusy}>Back</button>
		<button onClick={pagination.forward} disabled={pagination.atEnd || outBusy}>Next</button>
		<div>
			<div>{ outBusy && 'busy' }</div>
			<div>{ pagination.page + ': ' + value }</div>
			{ pagination.page === 2 ? <textarea className='ex-slide-txt' cols="30" rows="10" /> : null}
			<input type='number' value={reqPg} onChange={e => setReqPg(e.target.value)} disabled={outBusy}/>
			<button onClick={() => pagination.goTo(reqPg)} disabled={outBusy}>Go to page</button>
		</div>			
	</div>;
};