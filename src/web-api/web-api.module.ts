import { ApplicationModule } from "@/application/application.module";
import { Module } from "@nestjs/common";

@Module({
  imports: [ApplicationModule],
})
export class WebApiModule {}
