import {
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";

import { TimestampVo } from "src/domain/timestamp.vo";
import { UuidIdVo } from "src/domain/uuid-id.vo";

import { BackgroundDescriptionVo } from "../domain/background-description.vo";
import { BackgroundEventDateVo } from "../domain/background-event-date.vo";
import { BackgroundTitleVo } from "../domain/background-title.vo";
import { Background } from "../domain/background.entity";
import {
  BACKGROUND_REPOSITORY,
  IBackgroundRepository,
} from "../domain/background.repository.interface";

import { BackgroundService } from "./background.service";

describe("BackgroundService", () => {
  let service: BackgroundService;
  let repository: {
    [K in keyof IBackgroundRepository]: jest.Mock;
  };

  const mockId = UuidIdVo.create("123e4567-e89b-12d3-a456-426614174000");
  const mockBackground = Background.reconstruct(
    mockId,
    BackgroundTitleVo.create("Test Title"),
    BackgroundDescriptionVo.create("Test Description"),
    BackgroundEventDateVo.create(new Date()),
    TimestampVo.create(new Date())
  );

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BackgroundService,
        {
          provide: BACKGROUND_REPOSITORY,
          useValue: {
            findAll: jest.fn(),
            findById: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<BackgroundService>(BackgroundService);
    repository = module.get(BACKGROUND_REPOSITORY);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("findAll", () => {
    it("should return an array of backgrounds", async () => {
      const expected = [mockBackground];
      jest.spyOn(repository, "findAll").mockResolvedValue(expected);

      const result = await service.findAll();
      expect(result).toEqual(expected);
      expect(repository.findAll).toHaveBeenCalled();
    });

    it("should throw InternalServerErrorException when repository fails", async () => {
      jest
        .spyOn(repository, "findAll")
        .mockRejectedValue(new Error("DB Error"));

      const loggerSpy = jest
        .spyOn(Logger.prototype, "error")
        .mockImplementation();

      await expect(service.findAll()).rejects.toThrow(
        InternalServerErrorException
      );

      loggerSpy.mockRestore();
    });
  });

  describe("findById", () => {
    it("should return a background if found", async () => {
      jest.spyOn(repository, "findById").mockResolvedValue(mockBackground);

      const result = await service.findById(mockId.getValue());
      expect(result).toEqual(mockBackground);
      expect(repository.findById).toHaveBeenCalled();
    });

    it("should throw NotFoundException if not found", async () => {
      jest.spyOn(repository, "findById").mockResolvedValue(null);
      const loggerSpy = jest
        .spyOn(Logger.prototype, "warn")
        .mockImplementation();

      await expect(service.findById(mockId.getValue())).rejects.toThrow(
        NotFoundException
      );

      loggerSpy.mockRestore();
    });

    it("should throw InternalServerErrorException when repository fails", async () => {
      jest
        .spyOn(repository, "findById")
        .mockRejectedValue(new Error("DB Error"));
      const loggerSpy = jest
        .spyOn(Logger.prototype, "error")
        .mockImplementation();

      await expect(service.findById(mockId.getValue())).rejects.toThrow(
        InternalServerErrorException
      );

      loggerSpy.mockRestore();
    });
  });
});
