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
			<button onClick={dispatch.increment}>increment</button>
			<button onClick={dispatch.decrement}>decrement</button>
			<button onClick={dispatch.reset}>reset</button>
			<button onClick={() => dispatch.incrementByAmount(5)}>
				increment by 5
			</button>
		</div>
	);
}
