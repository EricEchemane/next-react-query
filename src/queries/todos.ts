import { useMutation, useQuery } from 'react-query';

export function useTodosQuery() {
	return useQuery('todos', () => fetch('/api/todos').then((res) => res.json()));
}

export function useTodoMutation() {
	return useMutation((title: string) =>
		fetch('/api/todos', {
			method: 'POST',
			body: JSON.stringify({ title }),
			headers: {
				'content-type': 'application/json',
			},
		})
	);
}
