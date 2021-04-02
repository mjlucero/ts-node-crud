import { Strategy, StrategyOptions, ExtractJwt } from 'passport-jwt';

const jwtOptions: StrategyOptions = {
	secretOrKey: process.env.JWT_SECRET,
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};

const jwtStrategy = new Strategy(jwtOptions, (jwtPayload, next) => {
	console.log(`jwtPayload`, jwtPayload);

	next(null, jwtPayload);
});

export default jwtStrategy;
