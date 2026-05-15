import { Achievement } from "src/modules/achievements/domain/achievement.entity";
import { AchievementResponseDto } from "src/modules/achievements/interface/dto/achievement-response.dto";

export class AchievementMapper {
  /**
   * Entityをフォーマットに変換
   * @param entity
   * @returns AchievementResponseDto
   */
  static toFormat(entity: Achievement): AchievementResponseDto {
    return {
      id: entity.id.getValue(),
      title: entity.title.getValue(),
      description: entity.description ? entity.description.getValue() : null,
      achievedAt: entity.achievedAt.getValue(),
    };
  }

  /**
   * Entity配列をフォーマット配列に変換
   * @param entities
   * @returns AchievementResponseDto[]
   */
  static toFormats(entities: Achievement[]): AchievementResponseDto[] {
    return entities.map((entity) => this.toFormat(entity));
  }
}
