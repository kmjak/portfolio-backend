import { BadRequestException } from "@nestjs/common";

import { BackgroundDescriptionVo } from "./background-description.vo";

describe("BackgroundDescriptionVo", () => {
  describe("create", () => {
    it("should create a valid description", () => {
      const desc = BackgroundDescriptionVo.create("Valid Description");
      expect(desc.getValue()).toBe("Valid Description");
    });

    it("should trim whitespace", () => {
      const desc = BackgroundDescriptionVo.create("  Valid Description  ");
      expect(desc.getValue()).toBe("Valid Description");
    });

    it("should throw BadRequestException for empty description", () => {
      expect(() => BackgroundDescriptionVo.create("")).toThrow(
        BadRequestException
      );
      expect(() => BackgroundDescriptionVo.create("   ")).toThrow(
        BadRequestException
      );
    });

    it("should throw BadRequestException for description longer than 512 chars", () => {
      const longDesc = "a".repeat(513);
      expect(() => BackgroundDescriptionVo.create(longDesc)).toThrow(
        BadRequestException
      );
    });
  });
});
