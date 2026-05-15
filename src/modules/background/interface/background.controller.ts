import { Controller, Get, Logger, Param } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { BackgroundService } from "../application/background.service";

import { BackgroundMapper } from "./background.mapper";
import { BackgroundResponseDto } from "./dto/background-response.dto";

@ApiTags("backgrounds")
@Controller("backgrounds")
export class BackgroundController {
  private readonly logger = new Logger(BackgroundController.name);

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

    this.logger.log(`Retrieved ${backgrounds.length} backgrounds.`);

    return BackgroundMapper.toFormats(backgrounds);
  }

  @Get(":id")
  @ApiOperation({ summary: "経歴詳細取得" })
  @ApiResponse({
    status: 200,
    description: "経歴詳細",
    type: BackgroundResponseDto,
  })
  async findById(@Param("id") id: string): Promise<BackgroundResponseDto> {
    const background = await this.backgroundService.findById(id);

    this.logger.log(`Retrieved background with ID ${id}.`);

    return BackgroundMapper.toFormat(background);
  }
}
