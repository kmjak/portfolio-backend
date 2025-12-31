import { BadRequestException } from "@nestjs/common";

import { BackgroundTitleVo } from "./background-title.vo";

describe("BackgroundTitleVo", () => {
  describe("create", () => {
    it("should create a valid title", () => {
      const title = BackgroundTitleVo.create("Valid Title");
      expect(title.getValue()).toBe("Valid Title");
    });

    it("should trim whitespace", () => {
      const title = BackgroundTitleVo.create("  Valid Title  ");
      expect(title.getValue()).toBe("Valid Title");
    });

    it("should throw BadRequestException for empty title", () => {
      expect(() => BackgroundTitleVo.create("")).toThrow(BadRequestException);
      expect(() => BackgroundTitleVo.create("   ")).toThrow(
        BadRequestException
      );
    });

    it("should throw BadRequestException for title longer than 50 chars", () => {
      const longTitle = "a".repeat(51);
      expect(() => BackgroundTitleVo.create(longTitle)).toThrow(
        BadRequestException
      );
    });
  });
});
