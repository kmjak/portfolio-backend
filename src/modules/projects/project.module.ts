import { Module } from "@nestjs/common";

import { PrismaModule } from "src/modules/prisma/prisma.module";
import { ProjectService } from "src/modules/projects/application/project.service";
import { PROJECT_REPOSITORY } from "src/modules/projects/domain/project.repository.interface";
import { ProjectRepository } from "src/modules/projects/infrastructure/project.repository";
import { ProjectController } from "src/modules/projects/interface/project.controller";

@Module({
  imports: [PrismaModule],
  controllers: [ProjectController],
  providers: [
    ProjectService,
    { provide: PROJECT_REPOSITORY, useClass: ProjectRepository },
  ],
})
export class ProjectModule {}
