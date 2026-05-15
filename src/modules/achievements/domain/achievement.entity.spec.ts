import { TimestampVo } from "src/domain/timestamp.vo";
import { UuidIdVo } from "src/domain/uuid-id.vo";

import { AchievedAtDateVo } from "./achieved-at-date.vo";
import { AchievementDescriptionVo } from "./achievement-description.vo";
import { AchievementTitleVo } from "./achievement-title.vo";
import { Achievement } from "./achievement.entity";

describe("Achievement", () => {
  const validUuid = "550e8400-e29b-41d4-a716-446655440000";
  const testId = UuidIdVo.create(validUuid);
  const testTitle = AchievementTitleVo.create("Test Achievement");
  const testDescription = AchievementDescriptionVo.create("Test description");
  const testDate = AchievedAtDateVo.create(new Date("2025-05-15"));
  const testTimestamp = TimestampVo.create(new Date());

  describe("create", () => {
    it("should create a new achievement with current timestamp", () => {
      const achievement = Achievement.create(
        testId,
        testTitle,
        testDescription,
        testDate
      );

      expect(achievement.id).toBe(testId);
      expect(achievement.title).toBe(testTitle);
      expect(achievement.description).toBe(testDescription);
      expect(achievement.achievedAt).toBe(testDate);
      expect(achievement.createdAt).toBeDefined();
      expect(achievement.updatedAt).toBeDefined();
    });

    it("should allow null description", () => {
      const achievement = Achievement.create(
        testId,
        testTitle,
        null,
        testDate
      );

      expect(achievement.description).toBeNull();
    });
  });

  describe("reconstruct", () => {
    it("should reconstruct an achievement from existing data", () => {
      const achievement = Achievement.reconstruct(
        testId,
        testTitle,
        testDescription,
        testDate,
        testTimestamp,
        testTimestamp
      );

      expect(achievement.id).toBe(testId);
      expect(achievement.title).toBe(testTitle);
      expect(achievement.description).toBe(testDescription);
      expect(achievement.achievedAt).toBe(testDate);
      expect(achievement.createdAt).toBe(testTimestamp);
      expect(achievement.updatedAt).toBe(testTimestamp);
    });
  });
});
