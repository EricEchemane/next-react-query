import { configureStore } from '@reduxjs/toolkit';
import { counterSlice } from './counter.store';

const store = configureStore({
	reducer: {
		counter: counterSlice.reducer,
	},
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
