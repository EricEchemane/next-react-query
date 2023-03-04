import Counter from '@/components/Counter';
import { act, fireEvent, render, screen } from '@testing-library/react';
import counterStore from '@/stores';
import { Provider as ReduxProvider } from 'react-redux';

const renderCounterComponent = async () => {
	await act(async () =>
		render(
			<ReduxProvider store={counterStore}>
				<Counter />
			</ReduxProvider>
		)
	);
};

beforeEach(renderCounterComponent);

describe('Counter component', () => {
	it('should render without problem', () => {
		const counterHeading = screen.getByText('Counter: 0');
		expect(counterHeading).toBeDefined();
	});

	it('should increment the counter when increment button is clicked', () => {
		const incrementButton = screen.getByText('increment');
		expect(incrementButton).toBeDefined();
		fireEvent.click(incrementButton);

		// by this time, the value of counter store should be 1
		const count = screen.getByText('Counter: 1');
		expect(count).toBeDefined();
	});

	it('should decrement the counter when decrement button is clicked', () => {
		const decrementButton = screen.getByText('decrement');

		expect(decrementButton).toBeDefined();
		fireEvent.click(decrementButton);

		// by this time, the value of counter store should be 0 again
		const count = screen.getByText('Counter: 0');
		expect(count).toBeDefined();
	});

	it('should increment the counter by 5', () => {
		const incrementByAmountButton = screen.getByText('increment by 5');

		expect(incrementByAmountButton).toBeDefined();
		fireEvent.click(incrementByAmountButton);

		const count = screen.getByText('Counter: 5');
		expect(count).toBeDefined();
	});

	it('should reset the counter back to zero', () => {
		const resetButton = screen.getByText('reset');

		expect(resetButton).toBeDefined();
		fireEvent.click(resetButton);

		const count = screen.getByText('Counter: 0');
		expect(count).toBeDefined();
	});
});
