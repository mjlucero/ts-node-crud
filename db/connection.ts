import { Sequelize } from 'sequelize';

const db = new Sequelize('users', 'root', '12345678', {
	host: 'localhost',
	dialect: 'mysql'
});

export default db;
