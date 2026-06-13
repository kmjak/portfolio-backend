import { TechCategoryDto } from "./project-detail-response.dto";

export class SkillResponseDto {
  id!: string;
  name!: string;
  level!: number;
  description?: string;
  categories!: TechCategoryDto[];
}
