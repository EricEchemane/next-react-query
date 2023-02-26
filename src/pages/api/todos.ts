import { Todo } from '@/queries/todos';
import { NextApiRequest, NextApiResponse } from 'next';

const todos: Todo[] = [];

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { method } = req;

	switch (method) {
		case 'GET':
			res.status(200).json(todos);
			break;
		case 'POST':
			const { title } = req.body;
			if (title) {
				const todo = { id: todos.length, title };
				todos.push(todo);
				res.status(201).json(todo);
			} else {
				res.status(400).json({ message: 'Bad Request' });
			}
			break;
		default:
			res.setHeader('Allow', ['GET', 'POST']);
			res.status(405).end(`Method ${method} Not Allowed`);
	}
}
