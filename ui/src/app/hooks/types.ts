export type PaginatedList<T> = {
  data: T[],
  page: number,
  pageSize: number,
  total: number,
  totalPages: number,
  hasNext: boolean,
  hasPrevious: boolean,
  next: number | null,
  previous: number | null
}

export const initialPaginatedList = <T>(): PaginatedList<T> => ({
  data: [],
  page: 1,
  pageSize: 10,
  total: 0,
  totalPages: 0,
  hasNext: false,
  hasPrevious: false,
  next: null,
  previous: null
})