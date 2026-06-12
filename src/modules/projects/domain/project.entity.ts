import { UuidIdVo } from "src/domain/uuid-id.vo";
import { ProjectDescriptionVo } from "./project-description.vo";
import { ProjectTitleVo } from "./project-title.vo";

export interface ProjectDetailInfo {
  background: string;
  keyPoints: string;
  challenges: string;
  solutions: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProjectSkillInfo {
  id: string;
  name: string;
  level: number;
  description?: string;
  categories: Array<{
    id: string;
    name: string;
  }>;
}

export class Project {
  readonly id: UuidIdVo;
  readonly title: ProjectTitleVo;
  readonly description: ProjectDescriptionVo;
  readonly thumbnailUrl?: string;
  readonly repoUrl?: string;
  readonly demoUrl?: string;
  readonly isFeatured: boolean;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly detail?: ProjectDetailInfo;
  readonly skills: ProjectSkillInfo[];

  private constructor(
    id: UuidIdVo,
    title: ProjectTitleVo,
    description: ProjectDescriptionVo,
    thumbnailUrl: string | undefined,
    repoUrl: string | undefined,
    demoUrl: string | undefined,
    isFeatured: boolean,
    createdAt: Date,
    updatedAt: Date,
    detail: ProjectDetailInfo | undefined,
    skills: ProjectSkillInfo[]
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.thumbnailUrl = thumbnailUrl;
    this.repoUrl = repoUrl;
    this.demoUrl = demoUrl;
    this.isFeatured = isFeatured;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.detail = detail;
    this.skills = skills;
  }

  static create(
    id: string,
    title: string,
    description: string,
    thumbnailUrl: string | undefined,
    repoUrl: string | undefined,
    demoUrl: string | undefined,
    isFeatured: boolean,
    createdAt: Date,
    updatedAt: Date,
    detail: ProjectDetailInfo | undefined,
    skills: ProjectSkillInfo[]
  ): Project {
    const idVo = UuidIdVo.create(id);
    const titleVo = ProjectTitleVo.create(title);
    const descriptionVo = ProjectDescriptionVo.create(description);

    return new Project(
      idVo,
      titleVo,
      descriptionVo,
      thumbnailUrl,
      repoUrl,
      demoUrl,
      isFeatured,
      createdAt,
      updatedAt,
      detail,
      skills
    );
  }

  static createMinimal(
    id: string,
    title: string,
    description: string,
    thumbnailUrl: string | undefined,
    repoUrl: string | undefined,
    demoUrl: string | undefined,
    isFeatured: boolean,
    createdAt: Date,
    updatedAt: Date
  ): Project {
    return Project.create(
      id,
      title,
      description,
      thumbnailUrl,
      repoUrl,
      demoUrl,
      isFeatured,
      createdAt,
      updatedAt,
      undefined,
      []
    );
  }
}
