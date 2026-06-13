import { Injectable, Logger } from "@nestjs/common";

import { UuidIdVo } from "src/domain/uuid-id.vo";
import { PrismaService } from "src/modules/prisma/application/prisma.service";

import { Project, ProjectSkillInfo } from "../domain/project.entity";
import { IProjectRepository } from "../domain/project.repository.interface";

@Injectable()
export class ProjectRepository implements IProjectRepository {
  private readonly logger = new Logger(ProjectRepository.name);

  constructor(private readonly prisma: PrismaService) {}

  async findAllSkills(): Promise<ProjectSkillInfo[]> {
    try {
      const skills = await this.prisma.skill.findMany({
        include: {
          categories: {
            include: {
              category: true,
            },
          },
        },
        orderBy: {
          name: "asc",
        },
      });

      return skills.map((skill) => ({
        id: skill.id,
        name: skill.name,
        level: skill.level,
        description: skill.description ?? undefined,
        categories: skill.categories.map((catMap) => ({
          id: catMap.category.id,
          name: catMap.category.name,
        })),
      }));
    } catch (error: unknown) {
      this.logger.error(
        `Failed to find all skills: ${
          error instanceof Error ? error.stack : "unknown error"
        }`
      );
      throw error;
    }
  }

  async findAll(): Promise<Project[]> {
    try {
      const projects = await this.prisma.project.findMany({
        orderBy: {
          createdAt: "desc",
        },
      });

      return projects.map((project) =>
        Project.createMinimal(
          project.id,
          project.title,
          project.description,
          project.thumbnailUrl ?? undefined,
          project.repoUrl ?? undefined,
          project.demoUrl ?? undefined,
          project.isFeatured,
          project.createdAt,
          project.updatedAt
        )
      );
    } catch (error: unknown) {
      this.logger.error(
        `Failed to find all projects: ${
          error instanceof Error ? error.stack : "unknown error"
        }`
      );
      throw error;
    }
  }

  async findById(id: UuidIdVo): Promise<Project | null> {
    try {
      const project = await this.prisma.project.findUnique({
        where: { id: id.getValue() },
      });

      if (!project) {
        return null;
      }

      return Project.createMinimal(
        project.id,
        project.title,
        project.description,
        project.thumbnailUrl ?? undefined,
        project.repoUrl ?? undefined,
        project.demoUrl ?? undefined,
        project.isFeatured,
        project.createdAt,
        project.updatedAt
      );
    } catch (error: unknown) {
      this.logger.error(
        `Failed to find project by id: ${
          error instanceof Error ? error.stack : "unknown error"
        }`
      );
      throw error;
    }
  }

  async findFeatured(limit: number): Promise<Project[]> {
    try {
      const projects = await this.prisma.project.findMany({
        where: {
          isFeatured: true,
        },
        take: limit,
        orderBy: {
          createdAt: "desc",
        },
      });

      return projects.map((project) =>
        Project.createMinimal(
          project.id,
          project.title,
          project.description,
          project.thumbnailUrl ?? undefined,
          project.repoUrl ?? undefined,
          project.demoUrl ?? undefined,
          project.isFeatured,
          project.createdAt,
          project.updatedAt
        )
      );
    } catch (error: unknown) {
      this.logger.error(
        `Failed to find featured projects: ${
          error instanceof Error ? error.stack : "unknown error"
        }`
      );
      throw error;
    }
  }

  async findByIdWithDetails(id: UuidIdVo): Promise<Project | null> {
    try {
      const project = await this.prisma.project.findUnique({
        where: { id: id.getValue() },
        include: {
          detail: true,
          skills: {
            include: {
              skill: {
                include: {
                  categories: {
                    include: {
                      category: true,
                    },
                  },
                },
              },
            },
          },
        },
      });

      if (!project) {
        return null;
      }

      const projectDetailInfo = project.detail
        ? {
            background: project.detail.background,
            keyPoints: project.detail.keyPoints,
            challenges: project.detail.challenges,
            solutions: project.detail.solutions,
            createdAt: project.detail.createdAt,
            updatedAt: project.detail.updatedAt,
          }
        : undefined;

      const skillsInfo = project.skills.map((skillMap) => ({
        id: skillMap.skill.id,
        name: skillMap.skill.name,
        level: skillMap.skill.level,
        description: skillMap.skill.description ?? undefined,
        categories: skillMap.skill.categories.map((catMap) => ({
          id: catMap.category.id,
          name: catMap.category.name,
        })),
      }));

      return Project.create(
        project.id,
        project.title,
        project.description,
        project.thumbnailUrl ?? undefined,
        project.repoUrl ?? undefined,
        project.demoUrl ?? undefined,
        project.isFeatured,
        project.createdAt,
        project.updatedAt,
        projectDetailInfo,
        skillsInfo
      );
    } catch (error: unknown) {
      this.logger.error(
        `Failed to find project with details by id: ${
          error instanceof Error ? error.stack : "unknown error"
        }`
      );
      throw error;
    }
  }
}
