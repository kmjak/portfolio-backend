import { BadRequestException } from "@nestjs/common";

import { AchievementDescriptionVo } from "./achievement-description.vo";

describe("AchievementDescriptionVo", () => {
  describe("create", () => {
    it("should create a valid description", () => {
      const description = AchievementDescriptionVo.create("Valid description");
      expect(description.getValue()).toBe("Valid description");
    });

    it("should trim whitespace", () => {
      const description = AchievementDescriptionVo.create(
        "  Valid description  "
      );
      expect(description.getValue()).toBe("Valid description");
    });

    it("should throw BadRequestException for empty description", () => {
      expect(() => AchievementDescriptionVo.create("")).toThrow(
        BadRequestException
      );
      expect(() => AchievementDescriptionVo.create("   ")).toThrow(
        BadRequestException
      );
    });

    it("should throw BadRequestException for description longer than 500 chars", () => {
      const longDescription = "a".repeat(501);
      expect(() => AchievementDescriptionVo.create(longDescription)).toThrow(
        BadRequestException
      );
    });
  });
});
