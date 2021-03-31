import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

const blueprintUser = Joi.object().keys({
	name: Joi.string().max(255).required(),
	email: Joi.string()
		.email({
			minDomainSegments: 2,
			tlds: { allow: ['com', 'net'] }
		})
		.required(),
	acive: Joi.boolean()
});

export const validateUser = (
	req: Request,
	res: Response,
	next: NextFunction
): void => {
	const { body } = req;

	const result = blueprintUser.validate(body, { abortEarly: false });

	if (result.error === null) {
		next();
	} else {
		const validationErrors = result.error?.details.reduce((errors, error) => {
			return errors + `[${error.message}] `;
		}, '');

		res.status(400).send({ message: validationErrors });
	}
};
