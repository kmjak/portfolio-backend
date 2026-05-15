import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { AchievementModule } from "src/modules/achievements/achievement.module";

import { BackgroundModule } from "./background/background.module";
import { PrismaModule } from "./prisma/prisma.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    BackgroundModule,
    AchievementModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
