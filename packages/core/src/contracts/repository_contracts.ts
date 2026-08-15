import type { CursorPagination, Page } from '../pagination';

/** Generic repository port. Implementations belong outside core/domain contracts. */
export interface IRepository<TEntity, TId, TFilter = never, TSort = never> {
  create(entity: TEntity): Promise<TEntity>;
  update(entity: TEntity): Promise<TEntity>;
  delete(id: TId): Promise<void>;
  findById(id: TId): Promise<TEntity | null>;
  exists(id: TId): Promise<boolean>;
  findAll(filter?: TFilter, sort?: TSort): Promise<readonly TEntity[]>;
  search(query: string, filter?: TFilter, sort?: TSort): Promise<readonly TEntity[]>;
  count(filter?: TFilter): Promise<number>;
  paginate(pagination: CursorPagination, filter?: TFilter, sort?: TSort): Promise<Page<TEntity>>;
}
