import { Module } from "@nestjs/common";

import { AchievementService } from "src/modules/achievements/application/achievement.service";
import { ACHIEVEMENT_REPOSITORY } from "src/modules/achievements/domain/achievement.repository.interface";
import { AchievementRepository } from "src/modules/achievements/infrastructure/achievement.repository";
import { AchievementController } from "src/modules/achievements/interface/achievement.controller";
import { PrismaModule } from "src/modules/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [AchievementController],
  providers: [
    AchievementService,
    { provide: ACHIEVEMENT_REPOSITORY, useClass: AchievementRepository },
  ],
})
export class AchievementModule {}
