import { TimestampVo } from "src/domain/timestamp.vo";
import { UuidIdVo } from "src/domain/uuid-id.vo";

import { BackgroundDescriptionVo } from "./background-description.vo";
import { BackgroundEventDateVo } from "./background-event-date.vo";
import { BackgroundTitleVo } from "./background-title.vo";

export class Background {
  private constructor(
    public readonly id: UuidIdVo,
    public readonly title: BackgroundTitleVo,
    public readonly description: BackgroundDescriptionVo | null,
    public readonly eventDate: BackgroundEventDateVo,
    public readonly createdAt: TimestampVo
  ) {}

  /**
   * 経歴 Entity再構築
   * @param id
   * @param title
   * @param description
   * @param eventDate
   * @param createdAt
   * @returns
   */
  static reconstruct(
    id: UuidIdVo,
    title: BackgroundTitleVo,
    description: BackgroundDescriptionVo | null,
    eventDate: BackgroundEventDateVo,
    createdAt: TimestampVo
  ): Background {
    return new Background(id, title, description, eventDate, createdAt);
  }
}
