import { TimestampVo } from "src/domain/timestamp.vo";
import { UuidIdVo } from "src/domain/uuid-id.vo";

import { AchievedAtDateVo } from "./achieved-at-date.vo";
import { AchievementDescriptionVo } from "./achievement-description.vo";
import { AchievementTitleVo } from "./achievement-title.vo";

/**
 * 実績Entity
 */
export class Achievement {
  private constructor(
    public readonly id: UuidIdVo,
    public readonly title: AchievementTitleVo,
    public readonly description: AchievementDescriptionVo | null,
    public readonly achievedAt: AchievedAtDateVo,
    public readonly createdAt: TimestampVo,
    public readonly updatedAt: TimestampVo
  ) {}

  /**
   * 実績 Entity再構築
   * @param id 実績ID
   * @param title 実績タイトル
   * @param description 実績説明
   * @param achievedAt 実績達成日
   * @param createdAt 作成日時
   * @param updatedAt 更新日時
   * @returns Achievement Entity
   */
  static reconstruct(
    id: UuidIdVo,
    title: AchievementTitleVo,
    description: AchievementDescriptionVo | null,
    achievedAt: AchievedAtDateVo,
    createdAt: TimestampVo,
    updatedAt: TimestampVo
  ): Achievement {
    return new Achievement(
      id,
      title,
      description,
      achievedAt,
      createdAt,
      updatedAt
    );
  }

  /**
   * 新しい実績を生成
   * @param id 実績ID
   * @param title 実績タイトル
   * @param description 実績説明
   * @param achievedAt 実績達成日
   * @returns Achievement Entity
   */
  static create(
    id: UuidIdVo,
    title: AchievementTitleVo,
    description: AchievementDescriptionVo | null,
    achievedAt: AchievedAtDateVo
  ): Achievement {
    const now = TimestampVo.create(new Date());
    return new Achievement(id, title, description, achievedAt, now, now);
  }
}
