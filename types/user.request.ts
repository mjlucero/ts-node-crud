import { Request } from 'express';
import {
	UserAttributes,
} from '../api/resources/users/users.model';

export type UserRequest = Request<unknown, unknown, UserAttributes>;
