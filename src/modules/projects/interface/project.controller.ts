import { Controller, Get, Logger, Param, Query } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { ProjectService } from "../application/project.service";

import { ProjectDetailResponseDto } from "./dto/project-detail-response.dto";
import { ProjectResponseDto } from "./dto/project-response.dto";
import { SkillResponseDto } from "./dto/skill-response.dto";
import { ProjectMapper } from "./project.mapper";

@ApiTags("projects")
@Controller("projects")
export class ProjectController {
  private readonly logger = new Logger(ProjectController.name);

  constructor(private readonly projectService: ProjectService) {}

  @Get()
  @ApiOperation({ summary: "プロジェクト一覧取得" })
  @ApiResponse({
    status: 200,
    description: "プロジェクト一覧",
  })
  async findAll(): Promise<ProjectResponseDto[]> {
    const projects = await this.projectService.findAll();

    this.logger.log(`Retrieved ${projects.length} projects.`);

    return ProjectMapper.toFormats(projects);
  }

  @Get("skills")
  @ApiOperation({ summary: "全スキル取得" })
  @ApiResponse({
    status: 200,
    description: "スキル一覧",
  })
  async findSkills(): Promise<SkillResponseDto[]> {
    const skills = await this.projectService.findAllSkills();

    this.logger.log(`Retrieved ${skills.length} skills.`);

    return ProjectMapper.toSkillFormats(skills);
  }

  @Get("featured")
  @ApiOperation({ summary: "ピックアップされたプロジェクト取得" })
  @ApiResponse({
    status: 200,
    description: "ピックアッププロジェクト一覧",
  })
  async findFeatured(
    @Query("limit") limit?: string
  ): Promise<ProjectResponseDto[]> {
    const limitNumber = limit ? parseInt(limit, 10) : 5;
    const projects = await this.projectService.findFeatured(limitNumber);

    this.logger.log(`Retrieved ${projects.length} featured projects.`);

    return ProjectMapper.toFormats(projects);
  }

  @Get(":id")
  @ApiOperation({ summary: "プロジェクト詳細取得（関連データ付き）" })
  @ApiResponse({
    status: 200,
    description: "プロジェクト詳細（スキル、詳細情報を含む）",
  })
  async findByIdWithDetails(
    @Param("id") id: string
  ): Promise<ProjectDetailResponseDto> {
    const project = await this.projectService.findByIdWithDetails(id);

    this.logger.log(`Retrieved project with ID ${id}.`);

    return ProjectMapper.toDetailFormat(project);
  }
}
