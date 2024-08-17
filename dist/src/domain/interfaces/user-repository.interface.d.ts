import { Prisma } from "@prisma/client";
import { User } from "../entities/user.entity";
import { IRepository } from "./repository.interface";
export interface IUserRepository extends IRepository<User, Prisma.UserWhereUniqueInput> {
    findCurrentOrThrow(): Promise<User>;
}
