import { Controller, Get, Logger, Param, Query } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { AchievementService } from "src/modules/achievements/application/achievement.service";
import { AchievementMapper } from "src/modules/achievements/interface/achievement.mapper";
import { AchievementResponseDto } from "src/modules/achievements/interface/dto/achievement-response.dto";

@ApiTags("achievements")
@Controller("achievements")
export class AchievementController {
  private readonly logger = new Logger(AchievementController.name);

  constructor(private readonly achievementService: AchievementService) {}

  @Get()
  @ApiOperation({ summary: "実績一覧取得" })
  @ApiResponse({
    status: 200,
    description: "実績一覧",
  })
  async findAll(): Promise<AchievementResponseDto[]> {
    const achievements = await this.achievementService.findAll();

    this.logger.log(`Retrieved ${achievements.length} achievements.`);

    return AchievementMapper.toFormats(achievements);
  }

  @Get("latest")
  @ApiOperation({ summary: "最新の実績取得" })
  @ApiResponse({
    status: 200,
    description: "最新の実績",
  })
  async findLatestWithCount(
    @Query("count") count: number
  ): Promise<AchievementResponseDto[]> {
    const achievements =
      await this.achievementService.findLatestWithCount(count);

    this.logger.log(`Retrieved latest ${achievements.length} achievements.`);

    return AchievementMapper.toFormats(achievements);
  }

  @Get(":id")
  @ApiOperation({ summary: "実績詳細取得" })
  @ApiResponse({
    status: 200,
    description: "実績詳細",
  })
  async findById(@Param("id") id: string): Promise<AchievementResponseDto> {
    const achievement = await this.achievementService.findById(id);

    this.logger.log(`Retrieved achievement with ID ${id}.`);

    return AchievementMapper.toFormat(achievement);
  }
}
