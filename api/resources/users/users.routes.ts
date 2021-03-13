import { Router, Request, Response } from 'express';

const usersRoutes = Router();

usersRoutes.get('/', (req: Request, res: Response) => {
	console.log('req', req);

	return res.json({
		path: 'GET users/'
	});
});

usersRoutes.get('/:id', (req: Request, res: Response) => {
	const { id } = req.params;

	return res.json({
		path: 'GET users/id',
		id
	});
});

usersRoutes.post('/', (req: Request, res: Response) => {
	const { body } = req;

	return res.json({
		path: 'POST users/',
		body
	});
});

usersRoutes.put('/:id', (req: Request, res: Response) => {
	const { id } = req.params;
	const { body } = req;

	return res.json({
		path: 'PUT users/id',
		id,
		body
	});
});

export default usersRoutes;