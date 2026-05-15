/**
 * 実績達成日のValue Object
 */
export class AchievedAtDateVo {
  private readonly value: Date;

  private constructor(value: Date) {
    this.value = value;
  }

  /**
   * 実績達成日用のValue Object生成
   * @param value 実績達成日
   * @returns AchievedAtDateVoのインスタンス
   */
  static create(value: Date): AchievedAtDateVo {
    return new AchievedAtDateVo(value);
  }

  /**
   * 実績達成日の取得
   * @returns 実績達成日
   */
  getValue(): Date {
    return this.value;
  }
}
