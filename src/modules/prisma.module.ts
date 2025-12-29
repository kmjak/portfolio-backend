import { Module } from "@nestjs/common";

import { PrismaService } from "./prisma/application/prisma.service";

@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
