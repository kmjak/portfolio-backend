import { Injectable } from "@nestjs/common";

import { AchievementModel } from "generated/prisma/models";
import { TimestampVo } from "src/domain/timestamp.vo";
import { UuidIdVo } from "src/domain/uuid-id.vo";
import { AchievedAtDateVo } from "src/modules/achievements/domain/achieved-at-date.vo";
import { AchievementDescriptionVo } from "src/modules/achievements/domain/achievement-description.vo";
import { AchievementTitleVo } from "src/modules/achievements/domain/achievement-title.vo";
import { Achievement } from "src/modules/achievements/domain/achievement.entity";
import { IAchievementRepository } from "src/modules/achievements/domain/achievement.repository.interface";
import { PrismaService } from "src/modules/prisma/application/prisma.service";

@Injectable()
export class AchievementRepository implements IAchievementRepository {
  constructor(private readonly prismaService: PrismaService) {}

  toEntity(achievementData: AchievementModel): Achievement {
    return Achievement.reconstruct(
      UuidIdVo.create(achievementData.id),
      AchievementTitleVo.create(achievementData.title),
      achievementData.description
        ? AchievementDescriptionVo.create(achievementData.description)
        : null,
      AchievedAtDateVo.create(achievementData.achievedAt),
      TimestampVo.create(achievementData.createdAt),
      TimestampVo.create(achievementData.updatedAt)
    );
  }

  async findAll(): Promise<Achievement[]> {
    const achievements = await this.prismaService.achievement.findMany({
      orderBy: {
        achievedAt: "desc",
      },
    });

    return achievements.map((achievement) => this.toEntity(achievement));
  }
  async findById(id: UuidIdVo): Promise<Achievement | null> {
    const achievement = await this.prismaService.achievement.findUnique({
      where: { id: id.getValue() },
    });

    if (!achievement) {
      return null;
    }

    return this.toEntity(achievement);
  }
  async findLatestWithCount(count: number): Promise<Achievement[]> {
    const achievements = await this.prismaService.achievement.findMany({
      orderBy: {
        achievedAt: "desc",
      },
      take: count,
    });

    return achievements.map((achievement) => this.toEntity(achievement));
  }
}
