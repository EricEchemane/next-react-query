import { useQuery } from 'react-query';

export function useTodosQuery() {
	return useQuery('todos', () => fetch('/api/todos').then((res) => res.json()));
}
