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

		it('should return 200 response', () => {
			const { req, res } = httpMock;
			todosApiHandler(req, res);
			expect(res._getStatusCode()).toBe(200);
		});

		it('should return an empty array', () => {
			const { req, res } = httpMock;
			todosApiHandler(req, res);
			const data = JSON.parse(res._getData());
			expect(data).toEqual([]);
		});
	});

	describe('POST', () => {
		it('should return 201 response', () => {
			httpMock = createMocks({
				method: 'POST',
				body: {
					title: 'Test',
				},
			});
			const { req, res } = httpMock;
			todosApiHandler(req, res);
			expect(res._getStatusCode()).toBe(201);
		});

		it('should return the created todo', () => {
			httpMock = createMocks({
				method: 'GET',
			});
			const { req, res } = httpMock;
			todosApiHandler(req, res);
			const data = JSON.parse(res._getData());
			expect(data).toEqual([
				{
					id: expect.any(Number),
					title: 'Test',
				},
			]);
		});
	});
});
