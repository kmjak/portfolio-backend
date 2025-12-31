import { Module } from "@nestjs/common";

import { BackgroundService } from "./background/application/background.service";
import { BACKGROUND_REPOSITORY } from "./background/domain/background.repository.interface";
import { BackgroundRepository } from "./background/infrastructure/background.repository";
import { BackgroundController } from "./background/interface/background.controller";
import { PrismaModule } from "./prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [BackgroundController],
  providers: [
    BackgroundService,
    { provide: BACKGROUND_REPOSITORY, useClass: BackgroundRepository },
  ],
})
export class BackgroundModule {}
