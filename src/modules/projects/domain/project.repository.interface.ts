import { UuidIdVo } from "src/domain/uuid-id.vo";
import { Project } from "./project.entity";

export const PROJECT_REPOSITORY = "PROJECT_REPOSITORY";

export interface IProjectRepository {
  findAll(): Promise<Project[]>;
  findById(id: UuidIdVo): Promise<Project | null>;
  findFeatured(limit: number): Promise<Project[]>;
  findByIdWithDetails(id: UuidIdVo): Promise<Project | null>;
}
