import { BaseEntity } from "../entities/base.entity";

export interface IRepository<TEntity extends BaseEntity, TWhere> {
  create(entity: TEntity): Promise<void>;

  findFirst(where: TWhere): Promise<TEntity>;

  findOne(where: TWhere): Promise<TEntity | null>;

  findOneOrThrow(where: TWhere): Promise<TEntity>;

  hardDelete(where: TWhere): Promise<void>;

  softDelete(where: TWhere): Promise<void>;

  softDeleteMany(where: TWhere): Promise<void>;

  update(where: TWhere, data: Partial<TEntity>): Promise<void>;
}
