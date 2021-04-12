import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import db from '../../../db/connection';

export interface UserAttributes {
	id: string;
	name: string;
	username: string;
	email: string;
	password: string;
	active: boolean;
}

export type UserCreationAttributes = Optional<UserAttributes, 'id'>;

export interface UserInstance
	extends Model<UserAttributes, UserCreationAttributes> {
	createdAt?: Date;
	updatedAt?: Date;
}

const User = db.define<UserInstance>('User', {
	id: {
		allowNull: false,
		autoIncrement: false,
		defaultValue: DataTypes.UUIDV4,
		primaryKey: true,
		type: DataTypes.UUID,
		unique: true
	},
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
		type: DataTypes.BOOLEAN,
		defaultValue: 1
	}
});

export default User;
