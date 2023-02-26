import '@testing-library/jest-dom';
import HomePage from '@/pages/index';
import { act, render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';

describe('HomePage', () => {
	it('should render no todos yet', async () => {
		const queryClient = new QueryClient();
		await act(async () =>
			render(
				<QueryClientProvider client={queryClient}>
					<HomePage />
				</QueryClientProvider>
			)
		);
		const noTodosList = screen.queryByText('No todos yet');
		expect(noTodosList).toBeNull();
	});
});
