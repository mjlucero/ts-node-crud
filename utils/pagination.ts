import { Model } from 'sequelize/types';
import { PaginationResponse, PagingDataResponse } from '../types/pagination';

export const getPagination = (
	page: number,
	size: number
): { limit: number; offset: number } => {
	const limit = size;
	const offset = page * limit;

	return { limit, offset };
};

export const getPagingData = <T>(
	modelName: string,
	data: PaginationResponse<T>,
	page: number,
	limit: number
): PagingDataResponse<T> => {
	const { count: totalItems, rows } = data;
	const currentPage = page ? +page : 0;
	const totalPages = Math.ceil(totalItems / limit);

	return {
		[modelName]: rows,
		totalItems,
		totalPages,
		currentPage
	};
};
