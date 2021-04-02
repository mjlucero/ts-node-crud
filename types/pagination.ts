import { Model } from "sequelize/types";

export type PaginationResponse<T> = { rows: Model<T, T>[]; count: number };

export type PagingDataResponse<T> = {
	[key: string]: Model<T, T>[] | number;
	totalItems: number;
	totalPages: number;
	currentPage: number;
};
