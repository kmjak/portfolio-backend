export class BackgroundEventDateVo {
  private readonly value: Date;

  private constructor(value: Date) {
    this.value = value;
  }

  /**
   * イベントの日付用のValue Object生成
   * @param value
   * @returns
   */
  static create(value: Date): BackgroundEventDateVo {
    return new BackgroundEventDateVo(value);
  }

  /**
   * イベントの日付取得
   * @returns イベントの日付
   */
  getValue(): Date {
    return this.value;
  }
}
