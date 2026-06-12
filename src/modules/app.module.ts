import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { AchievementModule } from "src/modules/achievements/achievement.module";

import { BackgroundModule } from "./background/background.module";
import { PrismaModule } from "./prisma/prisma.module";
import { ProjectModule } from "./projects/project.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    BackgroundModule,
    AchievementModule,
    ProjectModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
