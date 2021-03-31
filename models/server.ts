import express, { Application } from 'express';
import path from 'path';
import cors from 'cors';
import winston from 'winston';

import usersRoutes from '../api/resources/users/users.routes';
import db from '../db/connection';

const includeDate = winston.format(info => {
	return {
		...info,
		message: `${new Date().toISOString()} ${info.message}`
	};
});

const logger = winston.createLogger({
	transports: [
		new winston.transports.Console({
			level: 'debug',
			handleExceptions: true,
			format: winston.format.combine(
				winston.format.colorize(),
				winston.format.simple()
			)
		}),
		new winston.transports.File({
			level: 'info',
			handleExceptions: true,
			format: winston.format.combine(includeDate(), winston.format.simple()),
			maxsize: 5120000, //5mb
			maxFiles: 5,
			filename: path.join(__dirname, '../logs/app.log')
		})
	]
});

export class Server {
	private app: Application;
	private port: string;
	private apiPaths = {
		users: '/api/users'
	};

	constructor() {
		this.app = express();
		this.port = process.env.PORT || '8000';

		//db
		this.dbConnection();

		//Middlewares
		this.setupMiddlewares();

		//Register routes
		this.registryRoutes();
	}

	async dbConnection(): Promise<void> {
		try {
			await db.authenticate();
			logger.info('Database online');
		} catch (error) {
			throw new Error(error);
		}
	}

	setupMiddlewares(): void {
		//CORS
		this.app.use(cors());

		//BodyParser
		this.app.use(express.json());

		//Public resources
		this.app.use(express.static('public'));
	}

	listen(): void {
		this.app.listen(this.port, () => {
			console.log('Server running on port ' + this.port);
		});
	}

	registryRoutes(): void {
		this.app.use(this.apiPaths.users, usersRoutes);
	}
}

export default Server;
