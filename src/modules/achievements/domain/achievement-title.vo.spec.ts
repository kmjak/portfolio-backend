import { BadRequestException } from "@nestjs/common";

import { AchievementTitleVo } from "./achievement-title.vo";

describe("AchievementTitleVo", () => {
  describe("create", () => {
    it("should create a valid title", () => {
      const title = AchievementTitleVo.create("Valid Title");
      expect(title.getValue()).toBe("Valid Title");
    });

    it("should trim whitespace", () => {
      const title = AchievementTitleVo.create("  Valid Title  ");
      expect(title.getValue()).toBe("Valid Title");
    });

    it("should throw BadRequestException for empty title", () => {
      expect(() => AchievementTitleVo.create("")).toThrow(BadRequestException);
      expect(() => AchievementTitleVo.create("   ")).toThrow(
        BadRequestException
      );
    });

    it("should throw BadRequestException for title longer than 100 chars", () => {
      const longTitle = "a".repeat(101);
      expect(() => AchievementTitleVo.create(longTitle)).toThrow(
        BadRequestException
      );
    });
  });
});
