import sharp from "sharp";
import { ImageProcessor } from "./image-processor.service.js";

describe("ImageProcessor", () => {
  let buffer: Buffer;

  beforeAll(async () => {
    buffer = await sharp({
      create: {
        width: 1920,
        height: 1080,
        channels: 3,
        background: { r: 255, g: 255, b: 255 },
      },
    })
      .jpeg()
      .toBuffer();
  });

  it("should resize image and keep aspect ratio (1920x1080 → 1280x720)", async () => {
    const resized = await ImageProcessor.resizeImage(buffer, 1280, 720, "image/jpeg", true);
    const meta = await sharp(resized).metadata();

    expect(meta.width).toBeLessThanOrEqual(1280);
    expect(meta.height).toBeLessThanOrEqual(720);
  });

  it("should resize image with distortion when keepAspectRatio is false", async () => {
    const resized = await ImageProcessor.resizeImage(buffer, 1000, 500, "image/jpeg", false);
    const meta = await sharp(resized).metadata();

    expect(meta.width).toBe(1000);
    expect(meta.height).toBe(500);
  });

  it("should convert image to WebP", async () => {
    const resized = await ImageProcessor.resizeImage(buffer, 1280, 720, "image/webp", true);
    const meta = await sharp(resized).metadata();

    expect(meta.format).toBe("webp");
  });

  it("should convert image to PNG", async () => {
    const resized = await ImageProcessor.resizeImage(buffer, 800, 600, "image/png", false);
    const meta = await sharp(resized).metadata();
    expect(meta.format).toBe("png");
  });
  
  it("should convert image to JPEG by default", async () => {
    const resized = await ImageProcessor.resizeImage(buffer, 800, 600, "image/jpeg", false);
    const meta = await sharp(resized).metadata();
    expect(meta.format).toBe("jpeg");
  });
  
});
