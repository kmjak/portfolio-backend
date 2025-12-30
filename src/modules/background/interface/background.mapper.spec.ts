import { TimestampVo } from "src/domain/timestamp.vo";
import { UuidIdVo } from "src/domain/uuid-id.vo";

import { BackgroundDescriptionVo } from "../domain/background-description.vo";
import { BackgroundEventDateVo } from "../domain/background-event-date.vo";
import { BackgroundTitleVo } from "../domain/background-title.vo";
import { Background } from "../domain/background.entity";

import { BackgroundMapper } from "./background.mapper";

describe("BackgroundMapper", () => {
  const idStr = "123e4567-e89b-12d3-a456-426614174000";
  const titleStr = "Title";
  const descStr = "Desc";
  const now = new Date();

  const background = Background.reconstruct(
    UuidIdVo.create(idStr),
    BackgroundTitleVo.create(titleStr),
    BackgroundDescriptionVo.create(descStr),
    BackgroundEventDateVo.create(now),
    TimestampVo.create(now)
  );

  describe("toFormat", () => {
    it("should convert Entity to DTO", () => {
      const dto = BackgroundMapper.toFormat(background);

      expect(dto).toBeInstanceOf(Object);
      expect(dto.id).toBe(idStr);
      expect(dto.title).toBe(titleStr);
      expect(dto.description).toBe(descStr);
      expect(dto.eventDate).toBe(now);
      expect(dto.createdAt).toBe(now);
    });

    it("should handle null description", () => {
      const bgNullDesc = Background.reconstruct(
        UuidIdVo.create(idStr),
        BackgroundTitleVo.create(titleStr),
        null,
        BackgroundEventDateVo.create(now),
        TimestampVo.create(now)
      );

      const dto = BackgroundMapper.toFormat(bgNullDesc);
      expect(dto.description).toBeNull();
    });
  });

  describe("toFormats", () => {
    it("should convert array of Entities to array of DTOs", () => {
      const dtos = BackgroundMapper.toFormats([background]);

      expect(dtos).toHaveLength(1);
      expect(dtos[0].id).toBe(idStr);
    });
  });
});
