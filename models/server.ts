import express, { Application } from 'express';
import cors from 'cors';
import passport from 'passport';

import Logger from '../logger';
import db from '../db/connection';
import morganMiddleware from '../middlewares/morgan';
import authJWT from '../middlewares/auth';
import usersRoutes from '../api/resources/users/users.routes';

export class Server {
	private app: Application;
	private port: string;
	private apiPaths = {
		users: '/api/users'
	};

	constructor() {
		// Set passport strategy
		passport.use(authJWT);

		this.app = express();

		this.port = process.env.PORT || '8000';

		// Database
		this.dbConnection();

		// Middlewares
		this.setupMiddlewares();

		// Register routes
		this.registryRoutes();
	}

	async dbConnection(): Promise<void> {
		try {
			await db.authenticate();
			db.sync();
			Logger.info('Database online');
		} catch (error) {
			throw new Error(error);
		}
	}

	setupMiddlewares(): void {
		//CORS
		this.app.use(cors());

		//BodyParser
		this.app.use(express.json());

		// Passport initialize
		this.app.use(passport.initialize());

		//Morgan
		this.app.use(morganMiddleware);

		//Public resources
		this.app.use(express.static('public'));
	}

	listen(): void {
		this.app.listen(this.port, () => {
			Logger.info('Server running on port ' + this.port);
		});
	}

	registryRoutes(): void {
		this.app.use(this.apiPaths.users, usersRoutes);
	}
}

export default Server;
