import sharp from "sharp";

export class AspectRatioService {
  static async validate(
    buffer: Buffer,
    targetWidth: number,
    targetHeight: number,
    keepAspectRatio: boolean
  ): Promise<void> {
    if (!keepAspectRatio) {
      return;
    }

    const metadata = await sharp(buffer).metadata();

    const originalWidth = metadata.width || 1;
    const originalHeight = metadata.height || 1;
    const originalAspectRatio = originalWidth / originalHeight;
    const targetAspectRatio = targetWidth / targetHeight;
    const ratioDifference = Math.abs(originalAspectRatio - targetAspectRatio);

    const maxAllowedDifference = 0.2;

    if (ratioDifference > maxAllowedDifference) {
      throw new Error(
        `A resolução informada (${targetWidth}x${targetHeight}) distorce muito a imagem original (${originalWidth}x${originalHeight}).
Se você realmente quer essa resolução, desative a opção "manter proporção" para permitir o esticamento.`
      );
    }
  }
}
