import { UuidIdVo } from "src/domain/uuid-id.vo";

import { Background } from "./background.entity";

/**
 * Background用のDIトークン
 */
export const BACKGROUND_REPOSITORY = Symbol("BACKGROUND_REPOSITORY");

export interface IBackgroundRepository {
  findAll(): Promise<Background[]>;
  findById(id: UuidIdVo): Promise<Background | null>;
}
