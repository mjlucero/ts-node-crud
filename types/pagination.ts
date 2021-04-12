export type PaginationResponse<T> = { rows: T[]; count: number };

export type PagingDataResponse<T> = {
	[key: string]: T[] | number;
	totalItems: number;
	totalPages: number;
	currentPage: number;
};
