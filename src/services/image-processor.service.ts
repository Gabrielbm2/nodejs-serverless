import sharp from "sharp";
import { AspectRatioService } from "./aspect-ratio.service";

export class ImageProcessor {
  static async resizeImage(
    buffer: Buffer,
    width: number,
    height: number,
    mimeType: string,
    keepAspectRatio: boolean
  ): Promise<Buffer> {

    await AspectRatioService.validate(buffer, width, height, keepAspectRatio);

    const resized = await this.resizeAndEnhance(buffer, width, height, keepAspectRatio);
    const finalBuffer = await this.convertToFinalFormat(resized, mimeType);

    return finalBuffer;
  }

  private static async resizeAndEnhance(
    buffer: Buffer,
    width: number,
    height: number,
    keepAspectRatio: boolean
  ): Promise<Buffer> {
    const resizeOptions: sharp.ResizeOptions = {
      fit: keepAspectRatio ? "inside" : "fill",
      width,
      height,
      withoutEnlargement: false,
      background: { r: 255, g: 255, b: 255, alpha: 0 },
      kernel: sharp.kernel.lanczos3,
    };

    return await sharp(buffer)
      .resize(resizeOptions)
      .modulate({ brightness: 1.05, saturation: 1.1 })
      .sharpen({ sigma: 1.5, m1: 0.7, m2: 0.7 })
      .toBuffer();
  }

  private static async convertToFinalFormat(
    buffer: Buffer,
    mimeType: string
  ): Promise<Buffer> {
    const lowerMime = mimeType.toLowerCase();

    if (lowerMime.includes("png")) {
      return sharp(buffer)
        .png({
          quality: 95,
          compressionLevel: 9,
          adaptiveFiltering: true,
          palette: true,
        })
        .toBuffer();
    }

    if (lowerMime.includes("webp")) {
      return sharp(buffer)
        .webp({ quality: 95 })
        .toBuffer();
    }

    return sharp(buffer)
      .jpeg({
        quality: 98,
        chromaSubsampling: "4:4:4",
        progressive: true,
      })
      .toBuffer();
  }
}
