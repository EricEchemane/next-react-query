import { useDispatch, useSelector } from 'react-redux';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '.';

interface CounterState {
	value: number;
}

export const counterSlice = createSlice({
	name: 'counter',
	initialState: { value: 0 } as CounterState,
	reducers: {
		increment(state) {
			state.value++;
		},
		decrement(state) {
			state.value--;
		},
		incrementByAmount(state, action: PayloadAction<number>) {
			state.value += action.payload;
		},
		reset(state) {
			state.value = 0;
		},
	},
});

export function useCounterSelector() {
	return useSelector((state: RootState) => state.counter.value);
}

export function useCounterDispatcher() {
	const dispatch = useDispatch();
	const increment = () => dispatch(counterSlice.actions.increment());
	const decrement = () => dispatch(counterSlice.actions.decrement());
	const reset = () => dispatch(counterSlice.actions.reset());
	const incrementByAmount = (n: number) =>
		dispatch(counterSlice.actions.incrementByAmount(n));

	return {
		increment,
		decrement,
		reset,
		incrementByAmount,
	};
}
