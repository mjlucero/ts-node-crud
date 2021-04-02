import { Model } from 'sequelize/types';
import bcrypt from 'bcrypt';

import { IUser } from '../../../interfaces/user';
import User from '../../../models/user';
import { getPagination, getPagingData, PagingDataResponse } from '../../../utils/pagination';

export const createUser = (user: IUser): Promise<Model> => {
	const hashedPassword = bcrypt.hashSync(user.password, 10);

	const newUser = User.build({ ...user, password: hashedPassword });

	return newUser.save();
};

export const getUsers = async (page = 0, size = 5): Promise<PagingDataResponse<IUser>> => {
	const condition = null;

	const { limit, offset } = getPagination(page, size);

	const response = await User.findAndCountAll<Model<IUser>>({ limit, offset });

	const usersPaginated = getPagingData<IUser>('users', response, page, limit);

	return usersPaginated;
	/* .then(data => {
			const response = getPagingData(data, page, limit);
			res.send(response);
		})
		.catch(err => {
			res.status(500).send({
				message:
					err.message || 'Some error occurred while retrieving tutorials.'
			});
		}); */
};
