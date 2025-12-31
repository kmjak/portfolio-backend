export class TimestampVo {
  private readonly value: Date;

  private constructor(value: Date) {
    this.value = value;
  }

  static create(value: Date): TimestampVo {
    return new TimestampVo(value);
  }

  getValue(): Date {
    return this.value;
  }
}
