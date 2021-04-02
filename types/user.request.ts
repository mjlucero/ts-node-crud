import { Request } from 'express';
import { IUser } from '../interfaces/user';

export type UserRequest = Request<unknown, unknown, IUser>;
