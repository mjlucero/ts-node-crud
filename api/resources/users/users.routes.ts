import { Router, Request, Response } from 'express';

import jwt from 'jsonwebtoken';

import { UserRequest } from '../../../types/user.request';
import { validateUser } from './users.validate';
import jwtAuthenticate from '../../../middlewares/passportJWT';
import Logger from '../../../logger';
import {
	createUser,
	getUserById,
	getUserByUsernameAndPassword,
	getUsers
} from './users.controller';

const usersRoutes = Router();

usersRoutes.get('/', jwtAuthenticate, async (req: Request, res: Response) => {
	const { page, size, name, email, active } = req.query;

	const pageNumber = !isNaN(Number(page)) ? Number(page) : undefined;
	const sizeNumber = !isNaN(Number(size)) ? Number(size) : undefined;
	const strName = name ? name.toString() : undefined;
	const strEmail = email ? email.toString() : undefined;
	const boolActive = active ? !!active : undefined;

	const users = await getUsers(
		pageNumber,
		sizeNumber,
		strName,
		strEmail,
		boolActive
	);

	return res.json(users);
});

usersRoutes.get('/:id', async (req: Request, res: Response) => {
	const { id } = req.params;

	const user = await getUserById(id);

	if (!user) {
		return res.status(404).send(`User wit id ${id} doesn't exists`);
	}

	return res.json({ user });
});

usersRoutes.post('/', validateUser, async (req: UserRequest, res: Response) => {
	const user = await createUser(req.body);

	res.json({ user });
});

usersRoutes.post('/login', async (req: UserRequest, res: Response) => {
	const { username, password } = req.body;

	const loggedUserId = await getUserByUsernameAndPassword(username, password);

	if (loggedUserId) {
		const token = jwt.sign(
			{ id: loggedUserId },
			process.env.JWT_SECRET || 'secret-dev',
			{ expiresIn: 86400 }
		);

		res.json({ token });
	}
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
