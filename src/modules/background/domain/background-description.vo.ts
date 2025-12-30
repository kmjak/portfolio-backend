import { BadRequestException } from "@nestjs/common";

export class BackgroundDescriptionVo {
  private readonly value: string;
  private static readonly MIN_LENGTH = 1;
  private static readonly MAX_LENGTH = 512;

  private constructor(value: string) {
    this.value = value;
  }

  private static validate(value: string): void {
    if (value.length < this.MIN_LENGTH) {
      throw new BadRequestException("Background description cannot be empty.");
    }

    if (value.length > this.MAX_LENGTH) {
      throw new BadRequestException(
        `Background description cannot exceed ${this.MAX_LENGTH} characters.`
      );
    }
  }

  /**
   * 経歴説明用のValue Object生成
   * @param value 経歴説明文字列
   * @returns BackgroundDescriptionVoのインスタンス
   * @throws BadRequestException バリデーションエラー時
   */
  static create(value: string): BackgroundDescriptionVo {
    const formattedValue = value.trim();

    this.validate(formattedValue);

    return new BackgroundDescriptionVo(formattedValue);
  }

  /**
   * 経歴説明文字列取得
   * @returns 経歴説明文字列
   */
  getValue(): string {
    return this.value;
  }
}
