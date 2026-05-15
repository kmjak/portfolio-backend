import { BadRequestException } from "@nestjs/common";

/**
 * 実績説明のValue Object
 */
export class AchievementDescriptionVo {
  private readonly value: string;
  private static readonly MIN_LENGTH = 1;
  private static readonly MAX_LENGTH = 500;

  private constructor(value: string) {
    this.value = value;
  }

  private static validate(value: string): void {
    if (value.length < this.MIN_LENGTH) {
      throw new BadRequestException("Achievement description cannot be empty.");
    }

    if (value.length > this.MAX_LENGTH) {
      throw new BadRequestException(
        `Achievement description cannot exceed ${this.MAX_LENGTH} characters.`
      );
    }
  }

  /**
   * 実績説明用のValue Object生成
   * @param value 実績説明文字列
   * @returns AchievementDescriptionVoのインスタンス
   * @throws BadRequestException バリデーションエラー時
   */
  static create(value: string): AchievementDescriptionVo {
    const formattedValue = value.trim();

    this.validate(formattedValue);

    return new AchievementDescriptionVo(formattedValue);
  }

  /**
   * 実績説明文字列取得
   * @returns 実績説明文字列
   */
  getValue(): string {
    return this.value;
  }
}
