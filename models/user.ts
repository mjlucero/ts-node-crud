import { DataTypes } from 'sequelize';
import db from '../db/connection';

const User = db.define('user', {
	name: {
		type: DataTypes.STRING
	},
	username: {
		type: DataTypes.STRING
	},
	password: {
		type: DataTypes.STRING
	},
	email: {
		type: DataTypes.STRING
	},
	active: {
		type: DataTypes.BOOLEAN
	}
});

export default User;
