import { Todo } from '@/interfaces/todo.int';
import type { NextApiRequest, NextApiResponse } from 'next';

const todos: Todo[] = [
	{
		id: 1,
		title: 'Todo 1',
	},
	{
		id: 1,
		title: 'Todo 1',
	},
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	const { method } = req;
	switch (method) {
		case 'GET':
			res.status(200).json(todos);
			break;
		case 'POST':
			const { title } = req.body;
			const id = todos.length + 1;
			const todo = { id, title };
			todos.push(todo);
			res.status(201).end();
			break;
	}
}
