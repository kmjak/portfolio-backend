import { ApiProperty } from "@nestjs/swagger";

export class BackgroundResponseDto {
  @ApiProperty({
    description: "経歴ID",
    example: "123e4567-e89b-12d3-a456-426614174000",
  })
  id: string;

  @ApiProperty({
    description: "経歴タイトル",
    example: "株式会社Hoge 入社",
  })
  title: string;

  @ApiProperty({
    description: "経歴詳細",
    example: "バックエンドエンジニアとして従事",
    nullable: true,
  })
  description: string | null;

  @ApiProperty({
    description: "日付",
    example: "2020-04-01T00:00:00.000Z",
  })
  eventDate: Date;

  @ApiProperty({
    description: "作成日時",
    example: "2023-01-01T00:00:00.000Z",
  })
  createdAt: Date;
}
