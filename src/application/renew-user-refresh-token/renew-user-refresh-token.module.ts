import { Module } from "@nestjs/common";
import { InfrastructureModule } from "../../infrastructure/infrastructure.module";
import { RenewUserRefreshTokenEndpoint } from "./renew-user-refresh-token.endpoint";
import { RenewUserRefreshTokenUseCase } from "./renew-user-refresh-token.use-case";

@Module({
  imports: [InfrastructureModule],
  controllers: [RenewUserRefreshTokenEndpoint],
  providers: [RenewUserRefreshTokenUseCase],
})
export class RenewUserRefreshTokenModule {}
