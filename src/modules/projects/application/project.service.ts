import { Inject, Injectable, Logger } from "@nestjs/common";

import { UuidIdVo } from "src/domain/uuid-id.vo";

import { Project, ProjectSkillInfo } from "../domain/project.entity";
import {
  IProjectRepository,
  PROJECT_REPOSITORY,
} from "../domain/project.repository.interface";

@Injectable()
export class ProjectService {
  private readonly logger = new Logger(ProjectService.name);

  constructor(
    @Inject(PROJECT_REPOSITORY)
    private readonly projectRepository: IProjectRepository
  ) {}

  async findAllSkills(): Promise<ProjectSkillInfo[]> {
    try {
      return await this.projectRepository.findAllSkills();
    } catch (error: unknown) {
      const message = "Failed to retrieve skills";
      this.logger.error(
        `${message}: ${error instanceof Error ? error.stack : undefined}`
      );
      throw new Error(message);
    }
  }

  async findAll(): Promise<Project[]> {
    try {
      return await this.projectRepository.findAll();
    } catch (error: unknown) {
      const message = "Failed to retrieve projects";
      this.logger.error(
        `${message}: ${error instanceof Error ? error.stack : undefined}`
      );
      throw new Error(message);
    }
  }

  async findById(id: string): Promise<Project> {
    try {
      const idVo = UuidIdVo.create(id);
      const project = await this.projectRepository.findById(idVo);

      if (!project) {
        const message = `Project with id ${id} not found`;
        this.logger.warn(message);
        throw new Error(message);
      }

      return project;
    } catch (error: unknown) {
      const message = `Failed to retrieve project with id ${id}`;
      this.logger.error(
        `${message}: ${error instanceof Error ? error.stack : undefined}`
      );
      throw new Error(message);
    }
  }

  async findFeatured(limit: number): Promise<Project[]> {
    try {
      return await this.projectRepository.findFeatured(limit);
    } catch (error: unknown) {
      const message = `Failed to retrieve featured projects`;
      this.logger.error(
        `${message}: ${error instanceof Error ? error.stack : undefined}`
      );
      throw new Error(message);
    }
  }

  async findByIdWithDetails(id: string): Promise<Project> {
    try {
      const idVo = UuidIdVo.create(id);
      const project = await this.projectRepository.findByIdWithDetails(idVo);

      if (!project) {
        const message = `Project with id ${id} not found`;
        this.logger.warn(message);
        throw new Error(message);
      }

      return project;
    } catch (error: unknown) {
      const message = `Failed to retrieve project details with id ${id}`;
      this.logger.error(
        `${message}: ${error instanceof Error ? error.stack : undefined}`
      );
      throw new Error(message);
    }
  }
}
