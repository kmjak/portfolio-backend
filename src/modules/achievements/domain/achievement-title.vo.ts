import { BadRequestException } from "@nestjs/common";

/**
 * 実績タイトルのValue Object
 */
export class AchievementTitleVo {
  private readonly value: string;
  private static readonly MIN_LENGTH = 1;
  private static readonly MAX_LENGTH = 100;

  private constructor(value: string) {
    this.value = value;
  }

  private static validate(value: string): void {
    if (value.length < this.MIN_LENGTH) {
      throw new BadRequestException("Achievement title cannot be empty.");
    }

    if (value.length > this.MAX_LENGTH) {
      throw new BadRequestException(
        `Achievement title cannot exceed ${this.MAX_LENGTH} characters.`
      );
    }
  }

  /**
   * 実績タイトル用のValue Object生成
   * @param value 実績タイトル文字列
   * @returns AchievementTitleVoのインスタンス
   * @throws BadRequestException バリデーションエラー時
   */
  static create(value: string): AchievementTitleVo {
    const formattedValue = value.trim();

    this.validate(formattedValue);

    return new AchievementTitleVo(formattedValue);
  }

  /**
   * 実績タイトル文字列取得
   * @returns 実績タイトル文字列
   */
  getValue(): string {
    return this.value;
  }
}
