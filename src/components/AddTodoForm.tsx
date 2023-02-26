import { storeTodo } from '@/queries/todos';
import React, { FormEvent, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';

export default function AddTodoForm() {
	const queryClient = useQueryClient();
	const postTodo = useMutation(storeTodo, {
		onSuccess: () => queryClient.invalidateQueries('todos'),
	});
	const [todoTitle, setTodoTitle] = useState('');

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		postTodo.mutate(todoTitle, {
			onSuccess() {
				queryClient.invalidateQueries('todos');
				setTodoTitle('');
			},
		});
	};

	return (
		<form onSubmit={handleSubmit}>
			<input
				type='text'
				placeholder='Your new todo'
				value={todoTitle}
				onChange={(e) => setTodoTitle(e.target.value)}
				required
				minLength={5}
			/>
			<button type='submit'>save</button>
		</form>
	);
}
