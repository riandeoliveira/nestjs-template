import { DeepPartial, FindOneOptions } from "typeorm";
import { BaseEntity } from "../entities/base.entity";
import { MESSAGES } from "../messages/messages";

export interface IRepository<TEntity extends BaseEntity> {
  create(entity: DeepPartial<TEntity>): TEntity;

  delete(entity: TEntity): Promise<void>;

  exists(options: FindOneOptions<TEntity>): Promise<boolean>;

  findOne(options: FindOneOptions<TEntity>): Promise<TEntity>;

  findOneOrThrow(
    options: FindOneOptions<TEntity>,
    throwMessage?: keyof typeof MESSAGES,
  ): Promise<TEntity>;

  save(entity: TEntity): Promise<void>;

  softDelete(entity: TEntity): Promise<void>;

  update(entity: TEntity): Promise<void>;
}
