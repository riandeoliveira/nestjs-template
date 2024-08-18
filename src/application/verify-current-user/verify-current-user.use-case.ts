import { Injectable } from "@nestjs/common";
import { IUseCase } from "../../domain/interfaces/use-case.interface";
import { UserRepository } from "../../infrastructure/modules/repositories/user.repository";

@Injectable()
export class VerifyCurrentUserUseCase implements IUseCase {
  public constructor(private readonly userRepository: UserRepository) {}

  public async execute(): Promise<void> {
    await this.userRepository.findCurrentOrThrow();
  }
}
