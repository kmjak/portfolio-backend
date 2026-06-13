export class ProjectResponseDto {
  id!: string;
  title!: string;
  description!: string;
  thumbnailUrl?: string;
  repoUrl?: string;
  demoUrl?: string;
  isFeatured!: boolean;
  createdAt!: Date;
  updatedAt!: Date;
}
