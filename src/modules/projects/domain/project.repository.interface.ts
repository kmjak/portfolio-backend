import { UuidIdVo } from "src/domain/uuid-id.vo";
import {
  Project,
  ProjectSkillInfo,
} from "src/modules/projects/domain/project.entity";

export const PROJECT_REPOSITORY = "PROJECT_REPOSITORY";

export interface IProjectRepository {
  findAll(): Promise<Project[]>;
  findById(id: UuidIdVo): Promise<Project | null>;
  findFeatured(limit: number): Promise<Project[]>;
  findByIdWithDetails(id: UuidIdVo): Promise<Project | null>;
  findAllSkills(): Promise<ProjectSkillInfo[]>;
}
