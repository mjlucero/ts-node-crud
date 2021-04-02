import { Router, Request, Response } from 'express';

import jwt from 'jsonwebtoken';

import { UserRequest } from '../../../types/user.request';
import { validateUser } from './users.validate';
import jwtAuthenticate from '../../../middlewares/passportJWT';
import Logger from '../../../logger';
import { createUser, getUsers } from './users.controller';

const usersRoutes = Router();

usersRoutes.get('/', async (req: Request, res: Response) => {
	const { page, size } = req.query;

	const pageNumber = !isNaN(Number(page)) ? Number(page) : undefined;
	const sizeNumber = !isNaN(Number(size)) ? Number(size) : undefined;

	const users = await getUsers(pageNumber, sizeNumber);

	return res.json(users);
});

usersRoutes.get('/:id', (req: Request, res: Response) => {
	const { id } = req.params;

	return res.json({
		path: 'GET users/id',
		id
	});
});

usersRoutes.post('/', validateUser, async (req: UserRequest, res: Response) => {
	const user = await createUser(req.body);

	res.json({ user });
});

usersRoutes.post('/login', (req: UserRequest, res: Response) => {
	jwt.sign({ username: req.body.username }, 'secret', { expiresIn: 86400 });
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
