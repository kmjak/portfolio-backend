export class TechCategoryDto {
  id: string;
  name: string;
}

export class ProjectSkillDto {
  id: string;
  name: string;
  level: number;
  description?: string;
  categories: TechCategoryDto[];
}

export class ProjectDetailDto {
  background: string;
  keyPoints: string;
  challenges: string;
  solutions: string;
  createdAt: Date;
  updatedAt: Date;
}

export class ProjectDetailResponseDto {
  id: string;
  title: string;
  description: string;
  thumbnailUrl?: string;
  repoUrl?: string;
  demoUrl?: string;
  isFeatured: boolean;
  createdAt: Date;
  updatedAt: Date;
  detail?: ProjectDetailDto;
  skills: ProjectSkillDto[];
}
