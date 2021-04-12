import bcrypt from 'bcrypt';
import { Op } from 'sequelize';

import { getPagination, getPagingData } from '../../../utils/pagination';
import { PagingDataResponse } from '../../../types/pagination';
import User, { UserAttributes, UserInstance } from './users.model';
import Logger from '../../../logger';

export const createUser = (user: UserAttributes): Promise<UserInstance> => {
	const hashedPassword = bcrypt.hashSync(user.password, 10);

	const newUser = User.build({ ...user, password: hashedPassword });

	return newUser.save();
};

export const getUsers = async (
	page = 0,
	size = 5,
	name: string | undefined,
	email: string | undefined,
	active: boolean | undefined
): Promise<PagingDataResponse<UserInstance>> => {
	const conditions = {
		...(name && { name: { [Op.like]: `%${name}%` } }),
		...(email && { email: { [Op.like]: `%${email}%` } }),
		...(active && { active })
	};

	const { limit, offset } = getPagination(page, size);

	const response = await User.findAndCountAll({
		limit,
		offset,
		where: conditions
	});

	const usersPaginated = getPagingData<UserInstance>(
		'users',
		response,
		page,
		limit
	);

	return usersPaginated;
};

export const getUserById = (id: string): Promise<UserInstance | null> => {
	return User.findByPk(id);
};

export const getUserByEmailOrUsername = ({
	username: username,
	email: email
}: Partial<UserAttributes>): Promise<UserInstance | null> => {
	if (username) return User.findOne({ where: { username } });
	if (email) return User.findOne({ where: { email } });

	throw new Error(
		'getUserByEmailOrUsername was called without specify username or email'
	);
};

export const getUserByUsernameAndPassword = async (
	username: string,
	password: string
): Promise<string | null> => {
	const registeredUser = await getUserByEmailOrUsername({ username });

	if (!registeredUser) {
		Logger.info(`User ${username} doesn't exists. Couldn't be authenticated`);
		return null;
	}

	const isCorrectPassword = await bcrypt.compare(
		password,
		registeredUser.get().password
	);

	if (!isCorrectPassword) {
		return null;
	}

	return registeredUser.get().id;
};
