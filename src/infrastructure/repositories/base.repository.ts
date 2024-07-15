import { BaseEntity } from "@/domain/entities/base.entity";
import { ResponseMessages, ResponseMessagesKey } from "@/domain/enums/response-messages.enum";
import { IRepository } from "@/domain/interfaces/repository.interface";
import { Injectable, NotFoundException } from "@nestjs/common";
import { DeepPartial, EntityManager, FindOneOptions } from "typeorm";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";

@Injectable()
export abstract class BaseRepository<TEntity extends BaseEntity> implements IRepository<TEntity> {
  public constructor(
    protected readonly entity: { new (): TEntity },
    protected readonly repository: EntityManager,
  ) {}

  public create(entity: DeepPartial<TEntity>): TEntity {
    return this.repository.create(this.entity, entity);
  }

  public async delete(entity: TEntity): Promise<void> {
    await this.repository.remove(entity);
  }

  public async exists(options: FindOneOptions<TEntity>): Promise<boolean> {
    return await this.repository.exists(this.entity, options);
  }

  public async findOne(options: FindOneOptions<TEntity>): Promise<TEntity | null> {
    return await this.repository.findOne(this.entity, options);
  }

  public async findOneOrThrow(
    options: FindOneOptions<TEntity>,
    throwMessage: ResponseMessagesKey = "ENTITY_NOT_FOUND",
  ): Promise<TEntity> {
    const entity: TEntity | null = await this.findOne(options);

    if (!entity) throw new NotFoundException(ResponseMessages[throwMessage]);

    return entity;
  }

  public async save(entity: TEntity): Promise<void> {
    await this.repository.save(entity);
  }

  public async softDelete(entity: TEntity): Promise<void> {
    entity.deletedAt = new Date();

    await this.repository.update(this.entity, entity.id, entity as QueryDeepPartialEntity<TEntity>);
  }

  public async update(entity: TEntity): Promise<void> {
    entity.updatedAt = new Date();

    await this.repository.update(this.entity, entity.id, entity as QueryDeepPartialEntity<TEntity>);
  }
}
