import express, { Application } from 'express';
import usersRoutes from '../api/resources/users/users.routes';

export class Server {
	private app: Application;
	private port: string;
	private apiPaths = {
		users: '/api/users'
	};

	constructor() {
		this.app = express();
		this.port = process.env.PORT || '8000';

		//Load routes
		this.routes();
	}

	listen(): void {
		this.app.listen(this.port, () => {
			console.log('Server running on port ' + this.port);
		});
	}

	routes(): void {
		this.app.use(this.apiPaths.users, usersRoutes);
	}
}

export default Server;
