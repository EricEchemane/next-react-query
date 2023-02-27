import AddTodoForm from '@/components/AddTodoForm';
import { useTodoMutation } from '@/queries/todos';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';

jest.mock('@/queries/todos', () => ({
	useTodoMutation: jest.fn().mockReturnValue({ mutate: jest.fn() }),
}));

describe('AddTodoForm', () => {
	beforeEach(async () => {
		const queryClient = new QueryClient();

		await act(async () =>
			render(
				<QueryClientProvider client={queryClient}>
					<AddTodoForm />
				</QueryClientProvider>
			)
		);
	});
	it('should render the form with input and save button', async () => {
		const form = screen.queryByRole('form');
		const todoInput = screen.queryByRole('textbox');
		const saveButton = screen.queryByRole('button');
		expect(form).toBeDefined();
		expect(todoInput).toBeDefined();
		expect(saveButton).toBeDefined();
	});

	it('should update the todo input value when change and call useTodoMutation mutate function when save button is clicked and clears the input value', async () => {
		const todoInput = screen.queryByRole<HTMLInputElement>('textbox')!;
		fireEvent.change(todoInput, { target: { value: 'test todo' } });
		expect(todoInput.value).toBe('test todo');

		const spy = jest.spyOn(useTodoMutation(), 'mutate');
		const saveButton = screen.queryByRole<HTMLButtonElement>('button')!;
		fireEvent.click(saveButton);
		expect(spy).toHaveBeenCalled();

		expect(todoInput.value).toBe('');
	});
});
