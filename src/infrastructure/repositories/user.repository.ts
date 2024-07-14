import { User } from "@/domain/entities/user.entity";
import { IRepository } from "@/domain/interfaces/repository.interface";
import { MESSAGES } from "@/domain/messages/messages";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeepPartial, FindOneOptions, Repository } from "typeorm";

@Injectable()
export class UserRepository implements IRepository<User> {
  public constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  public create(user: DeepPartial<User>): User {
    return this.repository.create(user);
  }

  public async delete(user: User): Promise<void> {
    await this.repository.remove(user);
  }

  public async exists(options: FindOneOptions<User>): Promise<boolean> {
    return await this.repository.exists(options);
  }

  public async findOne(options: FindOneOptions<User>): Promise<User | null> {
    return await this.repository.findOne(options);
  }

  public async findOneOrThrow(options: FindOneOptions<User>): Promise<User> {
    const user: User | null = await this.repository.findOne(options);

    if (!user) throw new NotFoundException(MESSAGES.USER_NOT_FOUND);

    return user;
  }

  public async save(user: User): Promise<void> {
    await this.repository.save(user);
  }

  public async softDelete(user: User): Promise<void> {
    user.deletedAt = new Date();

    await this.repository.update(user.id, user);
  }

  public async update(user: User): Promise<void> {
    user.updatedAt = new Date();

    await this.repository.update(user.id, user);
  }
}
