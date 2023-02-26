import { NextApiRequest, NextApiResponse } from 'next';
import todosApiHandler from '@/pages/api/todos';
import { Mocks, createMocks } from 'node-mocks-http';

describe('/api/todos', () => {
	let httpMock: Mocks<NextApiRequest, NextApiResponse>;

	describe('GET', () => {
		beforeEach(() => {
			httpMock = createMocks({
				method: 'GET',
			});
		});

		it('should return 200 response', async () => {
			const { req, res } = httpMock;
			await todosApiHandler(req, res);
			expect(res._getStatusCode()).toBe(200);
		});

		it('should return an empty array', async () => {
			const { req, res } = httpMock;
			await todosApiHandler(req, res);
			const data = JSON.parse(res._getData());
			expect(data).toEqual([]);
		});
	});

	describe('POST', () => {
		it('should return 200 response', async () => {
			httpMock = createMocks({
				method: 'POST',
				body: {
					title: 'Test',
				},
			});
			const { req, res } = httpMock;
			await todosApiHandler(req, res);
			expect(res._getStatusCode()).toBe(200);
		});
	});
});
