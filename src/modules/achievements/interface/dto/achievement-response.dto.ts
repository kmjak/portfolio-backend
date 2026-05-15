import { ApiProperty } from "@nestjs/swagger";

export class AchievementResponseDto {
  @ApiProperty({
    description: "実績ID",
    example: "123e4567-e89b-12d3-a456-426614174000",
  })
  id!: string;

  @ApiProperty({
    description: "実績タイトル",
    example: "プロジェクトX 完了",
  })
  title!: string;

  @ApiProperty({
    description: "実績詳細",
    example: "プロジェクトXをリードして成功裏に完了させた。",
    nullable: true,
  })
  description!: string | null;

  @ApiProperty({
    description: "達成日",
    example: "2021-12-31T00:00:00.000Z",
  })
  achievedAt!: Date;
}
