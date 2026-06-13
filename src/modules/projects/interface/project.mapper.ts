import { Project, ProjectSkillInfo } from "../domain/project.entity";

import {
  ProjectDetailDto,
  ProjectDetailResponseDto,
  ProjectSkillDto,
} from "./dto/project-detail-response.dto";
import { ProjectResponseDto } from "./dto/project-response.dto";
import { SkillResponseDto } from "./dto/skill-response.dto";

export class ProjectMapper {
  static toFormat(project: Project): ProjectResponseDto {
    return {
      id: project.id.getValue(),
      title: project.title.value,
      description: project.description.value,
      thumbnailUrl: project.thumbnailUrl,
      repoUrl: project.repoUrl,
      demoUrl: project.demoUrl,
      isFeatured: project.isFeatured,
      createdAt: project.createdAt,
      updatedAt: project.updatedAt,
    };
  }

  static toFormats(projects: Project[]): ProjectResponseDto[] {
    return projects.map((project) => this.toFormat(project));
  }

  static toSkillFormats(skills: ProjectSkillInfo[]): SkillResponseDto[] {
    return skills.map((skill) => ({
      id: skill.id,
      name: skill.name,
      level: skill.level,
      description: skill.description,
      categories: skill.categories.map((cat) => ({
        id: cat.id,
        name: cat.name,
      })),
    }));
  }

  static toDetailFormat(project: Project): ProjectDetailResponseDto {
    const detail: ProjectDetailDto | undefined = project.detail
      ? {
          background: project.detail.background,
          keyPoints: project.detail.keyPoints,
          challenges: project.detail.challenges,
          solutions: project.detail.solutions,
          createdAt: project.detail.createdAt,
          updatedAt: project.detail.updatedAt,
        }
      : undefined;

    const skills: ProjectSkillDto[] = project.skills.map((skillInfo) => ({
      id: skillInfo.id,
      name: skillInfo.name,
      level: skillInfo.level,
      description: skillInfo.description,
      categories: skillInfo.categories.map((cat) => ({
        id: cat.id,
        name: cat.name,
      })),
    }));

    return {
      id: project.id.getValue(),
      title: project.title.value,
      description: project.description.value,
      thumbnailUrl: project.thumbnailUrl,
      repoUrl: project.repoUrl,
      demoUrl: project.demoUrl,
      isFeatured: project.isFeatured,
      createdAt: project.createdAt,
      updatedAt: project.updatedAt,
      detail,
      skills,
    };
  }

  static toDetailFormats(projects: Project[]): ProjectDetailResponseDto[] {
    return projects.map((project) => this.toDetailFormat(project));
  }
}
