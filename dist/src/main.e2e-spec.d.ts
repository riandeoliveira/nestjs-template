import TestAgent from "supertest/lib/agent";
import { AuthService } from "./infrastructure/modules/auth/auth.service";
import { PrismaService } from "./infrastructure/modules/prisma/prisma.service";
export declare let request: TestAgent;
export declare let prisma: PrismaService;
export declare let authService: AuthService;
