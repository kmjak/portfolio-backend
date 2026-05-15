import { UuidIdVo } from "src/domain/uuid-id.vo";

import { Achievement } from "./achievement.entity";

/**
 * Achievement用のDIトークン
 */
export const ACHIEVEMENT_REPOSITORY = Symbol("ACHIEVEMENT_REPOSITORY");

/**
 * Achievement リポジトリインターフェース
 */
export interface IAchievementRepository {
  /**
   * すべての実績を取得
   * @returns 実績の配列
   */
  findAll(): Promise<Achievement[]>;

  /**
   * IDで実績を取得
   * @param id 実績ID
   * @returns 実績、見つからない場合はnull
   */
  findById(id: UuidIdVo): Promise<Achievement | null>;

  /**
   * 最新の実績を取得
   * @param count 取得する実績の数
   * @returns 最新の実績の配列
   */
  findLatestWithCount(count: number): Promise<Achievement[]>;
}
