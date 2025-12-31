import { BackgroundEventDateVo } from "./background-event-date.vo";

describe("BackgroundEventDateVo", () => {
  describe("create", () => {
    it("should create a valid event date", () => {
      const now = new Date();
      const eventDate = BackgroundEventDateVo.create(now);
      expect(eventDate.getValue()).toBe(now);
    });
  });
});
