import AddTodoForm from '@/components/AddTodoForm';
import { getTodos, Todo } from '@/queries/todos';
import { Inter } from 'next/font/google';
import { useQuery } from 'react-query';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
	const todos = useQuery('todos', getTodos, {
		refetchOnWindowFocus: false,
	});

	return (
		<>
			<main className={inter.className}>
				<h1>Todos</h1>
				<AddTodoForm />
				{todos.isFetching ? (
					<p>Loading...</p>
				) : (
					<ul>
						{todos.data.map((todo: Todo) => (
							<li key={todo.id}>{todo.title}</li>
						))}
					</ul>
				)}
				<br />
			</main>
		</>
	);
}
