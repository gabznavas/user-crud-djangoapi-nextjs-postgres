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
