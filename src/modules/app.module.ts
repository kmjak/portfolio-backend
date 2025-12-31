import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { BackgroundModule } from "./background.module";
import { PrismaModule } from "./prisma.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    BackgroundModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
