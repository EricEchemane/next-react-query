import {
	useCounterDispatcher,
	useCounterSelector,
} from '@/stores/counter.store';
import React from 'react';

export default function Counter() {
	const count = useCounterSelector();
	const dispatch = useCounterDispatcher();

	return (
		<div>
			<h2>Counter: {count}</h2>
			<button
				data-testid='increment'
				onClick={dispatch.increment}
			>
				increment
			</button>
			<button
				data-testid='decrement'
				onClick={dispatch.decrement}
			>
				decrement
			</button>
			<button
				data-testid='reset'
				onClick={dispatch.reset}
			>
				reset
			</button>
			<button
				data-testid='incrementByAmount'
				onClick={() => dispatch.incrementByAmount(5)}
			>
				increment by 5
			</button>
		</div>
	);
}
