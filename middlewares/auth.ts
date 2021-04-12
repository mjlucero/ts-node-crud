import { Strategy, StrategyOptions, ExtractJwt } from 'passport-jwt';
import { getUserById } from '../api/resources/users/users.controller';
import Logger from '../logger';

const jwtOptions: StrategyOptions = {
	secretOrKey: process.env.JWT_SECRET,
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};

const jwtStrategy = new Strategy(jwtOptions, async (jwtPayload, next) => {
	const { id } = jwtPayload;

	const user = await getUserById(id);

	if (!user) {
		Logger.info(`Token is not valid. User with id ${id} doesn't exists.`);
		next(null, false);
		return;
	}

	next(null, {
		id: user.get().id,
		username: user.get().username
	});
});

export default jwtStrategy;
