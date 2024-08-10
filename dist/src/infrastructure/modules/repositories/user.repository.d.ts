import { User } from "@/domain/entities/user.entity";
import { IUserRepository } from "@/domain/interfaces/user-repository.interface";
import { Prisma } from "@prisma/client";
import { AuthService } from "../auth/auth.service";
import { PrismaService } from "../prisma/prisma.service";
export declare class UserRepository implements IUserRepository {
    private readonly prisma;
    private readonly authService;
    constructor(prisma: PrismaService, authService: AuthService);
    create(user: User): Promise<void>;
    findCurrentOrThrow(): Promise<User>;
    findFirst(where: Prisma.UserWhereInput): Promise<User | null>;
    findFirstOrThrow(where: Prisma.UserWhereInput): Promise<User>;
    findOne(where: Prisma.UserWhereUniqueInput): Promise<User | null>;
    findOneOrThrow(where: Prisma.UserWhereUniqueInput): Promise<User>;
    hardDelete(where: Prisma.UserWhereUniqueInput): Promise<void>;
    softDelete(where: Prisma.UserWhereUniqueInput): Promise<void>;
    softDeleteMany(where: Prisma.UserWhereInput): Promise<void>;
    update(where: Prisma.UserWhereUniqueInput, data: Partial<User>): Promise<void>;
}
