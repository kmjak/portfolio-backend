import { Injectable } from "@nestjs/common";

import { BackgroundModel } from "generated/prisma/models";
import { TimestampVo } from "src/domain/timestamp.vo";
import { UuidIdVo } from "src/domain/uuid-id.vo";
import { PrismaService } from "src/modules/prisma/application/prisma.service";

import { BackgroundDescriptionVo } from "../domain/background-description.vo";
import { BackgroundEventDateVo } from "../domain/background-event-date.vo";
import { BackgroundTitleVo } from "../domain/background-title.vo";
import { Background } from "../domain/background.entity";
import { IBackgroundRepository } from "../domain/background.repository.interface";

@Injectable()
export class BackgroundRepository implements IBackgroundRepository {
  constructor(private readonly prismaService: PrismaService) {}

  /**
   * PrismaのデータからEntityに変換
   * @param backgroundData
   * @returns Background Entity
   */
  private toEntity(backgroundData: BackgroundModel): Background {
    return Background.reconstruct(
      UuidIdVo.create(backgroundData.id),
      BackgroundTitleVo.create(backgroundData.title),
      backgroundData.description
        ? BackgroundDescriptionVo.create(backgroundData.description)
        : null,
      BackgroundEventDateVo.create(backgroundData.eventDate),
      TimestampVo.create(backgroundData.createdAt)
    );
  }

  /**
   * 全経歴取得
   * @returns 経歴Entity配列
   */
  async findAll(): Promise<Background[]> {
    const backgrounds = await this.prismaService.background.findMany();

    return backgrounds.map((background) => this.toEntity(background));
  }

  /**
   * IDで経歴取得
   * @param id 経歴ID
   * @returns 経歴Entity or null
   */
  async findById(id: UuidIdVo): Promise<Background | null> {
    const background = await this.prismaService.background.findUnique({
      where: { id: id.getValue() },
    });

    if (!background) {
      return null;
    }

    return this.toEntity(background);
  }
}
