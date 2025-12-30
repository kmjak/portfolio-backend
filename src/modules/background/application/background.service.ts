import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from "@nestjs/common";

import { UuidIdVo } from "src/domain/uuid-id.vo";

import { Background } from "../domain/background.entity";
import {
  BACKGROUND_REPOSITORY,
  IBackgroundRepository,
} from "../domain/background.repository.interface";

@Injectable()
export class BackgroundService {
  private readonly logger = new Logger(BackgroundService.name);

  constructor(
    @Inject(BACKGROUND_REPOSITORY)
    private readonly backgroundRepository: IBackgroundRepository
  ) {}
  async findAll(): Promise<Background[]> {
    try {
      return await this.backgroundRepository.findAll();
    } catch (error: unknown) {
      const message = "Failed to retrieve backgrounds";
      this.logger.error(
        `${message}: ${error instanceof Error ? error.stack : undefined}`
      );
      throw new InternalServerErrorException(message);
    }
  }

  async findById(id: string): Promise<Background> {
    try {
      const idVo = UuidIdVo.create(id);
      const background = await this.backgroundRepository.findById(idVo);

      if (!background) {
        const message = `Background with id ${id} not found`;
        this.logger.warn(message);
        throw new NotFoundException(message);
      }

      return background;
    } catch (error: unknown) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      const message = `Failed to retrieve background with id ${id}`;
      this.logger.error(
        `${message}: ${error instanceof Error ? error.stack : undefined}`
      );

      throw new InternalServerErrorException(message);
    }
  }
}
