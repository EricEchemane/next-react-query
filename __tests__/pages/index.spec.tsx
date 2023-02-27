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
	it('should render the loading state', async () => {
		(useTodosQuery as jest.Mock).mockImplementationOnce(() => {
			return {
				isLoading: true,
				data: null,
			};
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

		const loading = screen.queryByText('Loading...');
		expect(loading).toBeInTheDocument();
	});

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

	it('should render todos if there is data', async () => {
		const data = [
			{ id: 1, title: 'Todo 1' },
			{ id: 2, title: 'Todo 2' },
		];
		(useTodosQuery as jest.Mock).mockReturnValueOnce({ data });

		const queryClient = new QueryClient();

		await act(async () =>
			render(
				<QueryClientProvider client={queryClient}>
					<HomePage />
				</QueryClientProvider>
			)
		);

		expect(useTodosQuery).toHaveBeenCalled();

		const todos = screen.queryAllByRole('listitem');

		expect(todos).toHaveLength(data.length);
		expect(todos[0]).toHaveTextContent(data[0].title);
	});
});
