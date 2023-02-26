export interface Todo {
	id: number;
	title: string;
}

export const getTodos = () => fetch('/api/todos').then((res) => res.json());

export const storeTodo = (title: string) =>
	fetch('/api/todos', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ title }),
	}).then((res) => res.json());
