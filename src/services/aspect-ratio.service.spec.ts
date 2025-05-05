import sharp from "sharp";
import { AspectRatioService } from "./aspect-ratio.service.js";

describe("AspectRatioService", () => {
  let buffer: Buffer;

  beforeAll(async () => {
    buffer = await sharp({
      create: {
        width: 1920,
        height: 1080,
        channels: 3,
        background: { r: 255, g: 255, b: 255 },
      },
    }).jpeg().toBuffer();
  });

  it("should allow valid aspect ratio (1280x720)", async () => {
    await expect(
      AspectRatioService.validate(buffer, 1280, 720, true)
    ).resolves.not.toThrow();
  });

  it("should throw for invalid aspect ratio (1000x500)", async () => {
    await expect(
      AspectRatioService.validate(buffer, 1000, 500, true)
    ).rejects.toThrow(/distorce muito/);
  });

  it("should allow custom size if keepAspectRatio is false", async () => {
    await expect(
      AspectRatioService.validate(buffer, 1000, 500, false)
    ).resolves.not.toThrow();
  });

  it("should allow exact match of original size", async () => {
    await expect(
      AspectRatioService.validate(buffer, 1920, 1080, true)
    ).resolves.not.toThrow();
  });
});
