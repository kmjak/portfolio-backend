import { Background } from "../domain/background.entity";

import { BackgroundResponseDto } from "./dto/background-response.dto";

export class BackgroundMapper {
  /**
   * Entityをフォーマットに変換
   * @param entity
   * @returns BackgroundResponseDto
   */
  static toFormat(entity: Background): BackgroundResponseDto {
    return {
      id: entity.id.getValue(),
      title: entity.title.getValue(),
      description: entity.description ? entity.description.getValue() : null,
      eventDate: entity.eventDate.getValue(),
      createdAt: entity.createdAt.getValue(),
    };
  }

  /**
   * Entity配列をフォーマット配列に変換
   * @param entities
   * @returns BackgroundResponseDto[]
   */
  static toFormats(entities: Background[]): BackgroundResponseDto[] {
    return entities.map((entity) => this.toFormat(entity));
  }
}
