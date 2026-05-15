import { AchievedAtDateVo } from "./achieved-at-date.vo";

describe("AchievedAtDateVo", () => {
  describe("create", () => {
    it("should create a valid achieved at date", () => {
      const date = new Date("2025-05-15");
      const vo = AchievedAtDateVo.create(date);
      expect(vo.getValue()).toEqual(date);
    });

    it("should preserve the date value", () => {
      const date = new Date("2024-12-25");
      const vo = AchievedAtDateVo.create(date);
      expect(vo.getValue().getTime()).toBe(date.getTime());
    });
  });
});
