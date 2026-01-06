import { TimestampVo } from "src/domain/timestamp.vo";
import { UuidIdVo } from "src/domain/uuid-id.vo";

import { BackgroundDescriptionVo } from "./background-description.vo";
import { BackgroundEventDateVo } from "./background-event-date.vo";
import { BackgroundTitleVo } from "./background-title.vo";
import { Background } from "./background.entity";

describe("Background Entity", () => {
  const idStr = "123e4567-e89b-12d3-a456-426614174000";
  const titleStr = "Title";
  const descStr = "Desc";
  const now = new Date();

  const id = UuidIdVo.create(idStr);
  const title = BackgroundTitleVo.create(titleStr);
  const description = BackgroundDescriptionVo.create(descStr);
  const eventDate = BackgroundEventDateVo.create(now);
  const createdAt = TimestampVo.create(now);

  describe("reconstruct", () => {
    it("should reconstruct an existing background", () => {
      const background = Background.reconstruct(
        id,
        title,
        description,
        eventDate,
        createdAt
      );

      expect(background).toBeInstanceOf(Background);
      expect(background.id.getValue()).toBe(idStr);
      expect(background.title.getValue()).toBe(titleStr);
      expect(background.description?.getValue()).toBe(descStr);
      expect(background.eventDate.getValue()).toBe(now);
      expect(background.createdAt.getValue()).toBe(now);
    });

    it("should reconstruct with null description", () => {
      const background = Background.reconstruct(
        id,
        title,
        null,
        eventDate,
        createdAt
      );

      expect(background.description).toBeNull();
    });
  });
});
