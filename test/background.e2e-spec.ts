import { randomUUID } from "crypto";

import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";

import * as request from "supertest";
import { App } from "supertest/types";

import { AppModule } from "../src/modules/app.module";
import { PrismaService } from "../src/modules/prisma/application/prisma.service";

describe("BackgroundE2E (e2e)", () => {
  let app: INestApplication;
  let prismaService: PrismaService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    prismaService = moduleFixture.get<PrismaService>(PrismaService);
    await app.init();
  });

  afterAll(async () => {
    await prismaService.$disconnect();
    await app.close();
  });

  describe("GET /backgrounds", () => {
    it("should return 200 and an array of backgrounds", () => {
      return request(app.getHttpServer() as unknown as App)
        .get("/backgrounds")
        .expect(200)
        .expect((res) => {
          expect(Array.isArray(res.body)).toBe(true);
        });
    });
  });

  describe("GET /backgrounds/:id", () => {
    it("should return 200 and a background object for a valid ID", async () => {
      const id = randomUUID();
      const background = await prismaService.background.create({
        data: {
          id,
          title: "E2E Test Title",
          description: "E2E Test Description",
          eventDate: new Date(),
        },
      });

      try {
        await request(app.getHttpServer() as unknown as App)
          .get(`/backgrounds/${background.id}`)
          .expect(200)
          .expect((res) => {
            const body = res.body as { id: string; title: string };
            expect(body.id).toBe(background.id);
            expect(body.title).toBe(background.title);
          });
      } finally {
        await prismaService.background.delete({
          where: { id: background.id },
        });
      }
    });

    it("should return 404 for non-existent ID", () => {
      return request(app.getHttpServer() as unknown as App)
        .get("/backgrounds/00000000-0000-0000-0000-000000000000")
        .expect(404);
    });

    it("should return 400 for invalid UUID format", () => {
      return request(app.getHttpServer() as unknown as App)
        .get("/backgrounds/invalid-uuid")
        .expect(400);
    });
  });
});
