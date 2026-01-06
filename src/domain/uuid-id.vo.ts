import { BadRequestException } from "@nestjs/common";

/**
 * UUID用のValue Object
 */
export class UuidIdVo {
  private constructor(private readonly value: string) {}

  private static validate(value: string): void {
    if (typeof value !== "string") {
      throw new BadRequestException("UUID must be a string");
    }

    if (value.trim().length === 0) {
      throw new BadRequestException("UUID cannot be empty");
    }

    const uuidV4Regex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidV4Regex.test(value)) {
      throw new BadRequestException("Invalid UUID v4 format");
    }
  }

  static create(value: string): UuidIdVo {
    this.validate(value);

    return new UuidIdVo(value);
  }

  getValue(): string {
    return this.value;
  }

  equals(other: UuidIdVo): boolean {
    return this.value === other.value;
  }
}
