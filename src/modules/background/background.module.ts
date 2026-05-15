import { Module } from "@nestjs/common";

import { PrismaModule } from "../prisma/prisma.module";

import { BackgroundService } from "./application/background.service";
import { BACKGROUND_REPOSITORY } from "./domain/background.repository.interface";
import { BackgroundRepository } from "./infrastructure/background.repository";
import { BackgroundController } from "./interface/background.controller";

@Module({
  imports: [PrismaModule],
  controllers: [BackgroundController],
  providers: [
    BackgroundService,
    { provide: BACKGROUND_REPOSITORY, useClass: BackgroundRepository },
  ],
})
export class BackgroundModule {}
