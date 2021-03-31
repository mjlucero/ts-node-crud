import { Router, Request, Response } from 'express';
import { validateUser } from './users.validate';

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

usersRoutes.post('/', validateUser, (req: Request, res: Response) => {
	return res.json({
		path: 'POST users/'
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
