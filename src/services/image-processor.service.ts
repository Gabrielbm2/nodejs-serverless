import sharp from "sharp";

export async function resizeImage(
  buffer: Buffer,
  width: number,
  height: number,
  mimeType: string,
  keepAspectRatio: boolean
): Promise<Buffer> {
  const metadata = await sharp(buffer).metadata();

  const originalWidth = metadata.width!;
  const originalHeight = metadata.height!;
  const originalAspectRatio = originalWidth / originalHeight;
  const targetAspectRatio = width / height;
  const ratioDifference = Math.abs(originalAspectRatio - targetAspectRatio);

  const maxAllowedDifference = 0.2;

  if (keepAspectRatio && ratioDifference > maxAllowedDifference) {
    throw new Error(
      "As dimensões informadas distorcem o formato original da imagem. Para continuar, desative a opção de manter proporção."
    );
  }

  const resizeOptions: sharp.ResizeOptions = {
    fit: keepAspectRatio
      ? originalAspectRatio > targetAspectRatio
        ? "cover"
        : "contain"
      : "fill",
    width,
    height,
    withoutEnlargement: false,
    background: { r: 255, g: 255, b: 255, alpha: 0 },
    kernel: sharp.kernel.lanczos3,
  };

  let processedBuffer = await sharp(buffer)
    .resize(resizeOptions)
    .modulate({ brightness: 1.05, saturation: 1.1 })
    .sharpen({ sigma: 1.5, m1: 0.7, m2: 0.7 })
    .toBuffer();

  const lowerMime = mimeType.toLowerCase();

  if (lowerMime.includes("png")) {
    processedBuffer = await sharp(processedBuffer)
      .png({
        quality: 95,
        compressionLevel: 9,
        adaptiveFiltering: true,
        palette: true,
      })
      .toBuffer();
  } else if (lowerMime.includes("webp")) {
    processedBuffer = await sharp(processedBuffer)
      .webp({ quality: 95 })
      .toBuffer();
  }

  return processedBuffer;
}
