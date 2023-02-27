import '@testing-library/jest-dom';
import HomePage from '@/pages/index';
import { act, render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useTodosQuery } from '@/queries/todos';

jest.mock('@/queries/todos', () => ({
	__esModule: true,
	...jest.requireActual('@/queries/todos'),
	useTodosQuery: jest.fn(),
}));

describe('HomePage', () => {
	it('should not render todos yet if there is no data', async () => {
		(useTodosQuery as jest.Mock).mockReturnValueOnce({
			data: [],
		});

		const queryClient = new QueryClient();

		await act(async () =>
			render(
				<QueryClientProvider client={queryClient}>
					<HomePage />
				</QueryClientProvider>
			)
		);

		expect(useTodosQuery).toHaveBeenCalled();

		const noTodosYet = screen.queryByText('No todos yet');
		expect(noTodosYet).toBeInTheDocument();
	});
});
