import { BadRequestException } from "@nestjs/common";

export class BackgroundTitleVo {
  private readonly value: string;
  private static readonly MIN_LENGTH = 1;
  private static readonly MAX_LENGTH = 50;

  private constructor(value: string) {
    this.value = value;
  }

  private static validate(value: string): void {
    if (value.length < this.MIN_LENGTH) {
      throw new BadRequestException("Background title cannot be empty.");
    }

    if (value.length > this.MAX_LENGTH) {
      throw new BadRequestException(
        `Background title cannot exceed ${this.MAX_LENGTH} characters.`
      );
    }
  }

  /**
   * 経歴タイトル用のValue Object生成
   * @param value 経歴タイトル文字列
   * @returns BackgroundTitleVoのインスタンス
   * @throws BadRequestException バリデーションエラー時
   */
  static create(value: string): BackgroundTitleVo {
    const formattedValue = value.trim();

    this.validate(formattedValue);

    return new BackgroundTitleVo(formattedValue);
  }

  /**
   * 経歴タイトル文字列取得
   * @returns 経歴タイトル文字列
   */
  getValue(): string {
    return this.value;
  }
}
