import { Controller, Get, Param } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { BackgroundService } from "../application/background.service";

import { BackgroundMapper } from "./background.mapper";
import { BackgroundResponseDto } from "./dto/background-response.dto";

@ApiTags("backgrounds")
@Controller("backgrounds")
export class BackgroundController {
  constructor(private readonly backgroundService: BackgroundService) {}

  @Get()
  @ApiOperation({ summary: "経歴一覧取得" })
  @ApiResponse({
    status: 200,
    description: "経歴一覧",
    type: [BackgroundResponseDto],
  })
  async findAll(): Promise<BackgroundResponseDto[]> {
    const backgrounds = await this.backgroundService.findAll();

    return BackgroundMapper.toFormats(backgrounds);
  }

  @Get(":id")
  @ApiOperation({ summary: "経歴詳細取得" })
  @ApiResponse({
    status: 200,
    description: "経歴詳細",
    type: BackgroundResponseDto,
  })
  async findById(
    @Param("id") id: string
  ): Promise<BackgroundResponseDto | null> {
    const background = await this.backgroundService.findById(id);

    return BackgroundMapper.toFormat(background);
  }
}
