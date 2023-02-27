import { useTodoMutation } from '@/queries/todos';
import React, { useState } from 'react';
import { useQueryClient } from 'react-query';

export default function AddTodoForm() {
	const [todo, setTodo] = useState('');
	const queryClient = useQueryClient();
	const storeTodo = useTodoMutation();

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		storeTodo.mutate(todo, {
			onSuccess() {
				queryClient.invalidateQueries('todos');
			},
		});
		setTodo('');
	};

	return (
		<form onSubmit={handleSubmit}>
			<input
				required
				value={todo}
				onChange={(e) => setTodo(e.target.value)}
				placeholder='Add todo'
				type='text'
			/>
			<button type='submit'>Add</button>
		</form>
	);
}
