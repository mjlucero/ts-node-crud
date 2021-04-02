import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { IUser } from '../../../interfaces/user';

const blueprintUser = Joi.object<IUser>().keys({
	name: Joi.string().max(255).required(),
	username: Joi.string().max(255).required(),
	password: Joi.string().min(6).max(30).required(),
	email: Joi.string()
		.email({
			minDomainSegments: 2,
			tlds: { allow: ['com', 'net'] }
		})
		.required(),
	active: Joi.boolean()
});

export const validateUser = (
	req: Request,
	res: Response,
	next: NextFunction
): void => {
	const { body } = req;

	const result = blueprintUser.validate(body, { abortEarly: false });

	if (!result.error) {
		next();
	} else {
		const validationErrors = result.error?.details.reduce((errors, error) => {
			return errors + `[${error.message}] `;
		}, '');

		res.status(400).send({ message: validationErrors });
	}
};
