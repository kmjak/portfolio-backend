import { BadRequestException } from "@nestjs/common";

import { UuidIdVo } from "./uuid-id.vo";

describe("UuidIdVo", () => {
  describe("create", () => {
    it("should create a valid UuidIdVo", () => {
      const validUuid = "123e4567-e89b-12d3-a456-426614174000";
      const uuidVo = UuidIdVo.create(validUuid);
      expect(uuidVo.getValue()).toBe(validUuid);
    });

    it("should throw BadRequestException if value is not a string", () => {
      expect(() => UuidIdVo.create(123 as unknown as string)).toThrow(
        BadRequestException
      );
      expect(() => UuidIdVo.create(123 as unknown as string)).toThrow(
        "User ID must be a string"
      );
    });

    it("should throw BadRequestException if value is empty", () => {
      expect(() => UuidIdVo.create("")).toThrow(BadRequestException);
      expect(() => UuidIdVo.create("")).toThrow("User ID cannot be empty");
    });

    it("should throw BadRequestException if value is empty (whitespace)", () => {
      expect(() => UuidIdVo.create("   ")).toThrow(BadRequestException);
      expect(() => UuidIdVo.create("   ")).toThrow("User ID cannot be empty");
    });

    it("should throw BadRequestException if value is invalid UUID", () => {
      expect(() => UuidIdVo.create("invalid-uuid")).toThrow(
        BadRequestException
      );
      expect(() => UuidIdVo.create("invalid-uuid")).toThrow(
        "Invalid UUID v4 format"
      );
    });
  });

  describe("equals", () => {
    it("should return true for same UUIDs", () => {
      const uuid1 = "123e4567-e89b-12d3-a456-426614174000";
      const uuidVo1 = UuidIdVo.create(uuid1);
      const uuidVo2 = UuidIdVo.create(uuid1);
      expect(uuidVo1.equals(uuidVo2)).toBe(true);
    });

    it("should return false for different UUIDs", () => {
      const uuid1 = "123e4567-e89b-12d3-a456-426614174000";
      const uuid2 = "123e4567-e89b-12d3-a456-426614174001";
      const uuidVo1 = UuidIdVo.create(uuid1);
      const uuidVo2 = UuidIdVo.create(uuid2);
      expect(uuidVo1.equals(uuidVo2)).toBe(false);
    });
  });
});
