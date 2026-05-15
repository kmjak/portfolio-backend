import { UuidIdVo } from "src/domain/uuid-id.vo";

import { BackgroundDescriptionVo } from "./background-description.vo";
import { BackgroundEventDateVo } from "./background-event-date.vo";
import { BackgroundTitleVo } from "./background-title.vo";

export class Background {
  private constructor(
    public readonly id: UuidIdVo,
    public readonly title: BackgroundTitleVo,
    public readonly description: BackgroundDescriptionVo | null,
    public readonly eventDate: BackgroundEventDateVo
  ) {}

  /**
   * 経歴 Entity再構築
   * @param id
   * @param title
   * @param description
   * @param eventDate
   * @param createdAt
   * @returns Background Entity
   */
  static reconstruct(
    id: UuidIdVo,
    title: BackgroundTitleVo,
    description: BackgroundDescriptionVo | null,
    eventDate: BackgroundEventDateVo
  ): Background {
    return new Background(id, title, description, eventDate);
  }
}
