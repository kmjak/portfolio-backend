import { Inject, Injectable, Logger } from "@nestjs/common";

import { UuidIdVo } from "src/domain/uuid-id.vo";
import { Achievement } from "src/modules/achievements/domain/achievement.entity";
import {
  ACHIEVEMENT_REPOSITORY,
  IAchievementRepository,
} from "src/modules/achievements/domain/achievement.repository.interface";

@Injectable()
export class AchievementService {
  private readonly logger = new Logger(AchievementService.name);

  constructor(
    @Inject(ACHIEVEMENT_REPOSITORY)
    private readonly achievementRepository: IAchievementRepository
  ) {}

  async findAll(): Promise<Achievement[]> {
    try {
      return await this.achievementRepository.findAll();
    } catch (error: unknown) {
      const message = "Failed to retrieve achievements";
      this.logger.error(
        `${message}: ${error instanceof Error ? error.stack : undefined}`
      );
      throw new Error(message);
    }
  }

  async findById(id: string): Promise<Achievement> {
    try {
      const idVo = UuidIdVo.create(id);
      const achievement = await this.achievementRepository.findById(idVo);

      if (!achievement) {
        const message = `Achievement with id ${id} not found`;
        this.logger.warn(message);
        throw new Error(message);
      }

      return achievement;
    } catch (error: unknown) {
      const message = `Failed to retrieve achievement with id ${id}`;
      this.logger.error(
        `${message}: ${error instanceof Error ? error.stack : undefined}`
      );
      throw new Error(message);
    }
  }

  async findLatestWithCount(count: number): Promise<Achievement[]> {
    try {
      return await this.achievementRepository.findLatestWithCount(count);
    } catch (error: unknown) {
      const message = `Failed to retrieve latest achievements`;
      this.logger.error(
        `${message}: ${error instanceof Error ? error.stack : undefined}`
      );
      throw new Error(message);
    }
  }
}
