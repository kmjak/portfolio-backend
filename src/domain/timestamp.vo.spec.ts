import { TimestampVo } from "./timestamp.vo";

describe("TimestampVo", () => {
  describe("create", () => {
    it("should create a valid TimestampVo", () => {
      const date = new Date("2023-01-01T00:00:00.000Z");
      const timestampVo = TimestampVo.create(date);
      expect(timestampVo.getValue()).toEqual(date);
    });
  });

  describe("getValue", () => {
    it("should return the date value", () => {
      const date = new Date("2023-01-01T00:00:00.000Z");
      const timestampVo = TimestampVo.create(date);
      expect(timestampVo.getValue()).toEqual(date);
    });
  });
});
