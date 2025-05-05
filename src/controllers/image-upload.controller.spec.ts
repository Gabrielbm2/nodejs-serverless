import { processImageHandler } from "./image-upload.controller.js";
import { ImageProcessor } from "../services/image-processor.service.js";
import { uploadToS3 } from "../utils/s3.js";
import { create as createFile } from "../services/files.service.js";

jest.mock("../services/image-processor.service.js");
jest.mock("../utils/s3.js");
jest.mock("../services/files.service.js");

describe("processImageHandler", () => {
  const mockRes = () => {
    const res: any = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };

  const mockFile = {
    originalname: "test.jpg",
    mimetype: "image/jpeg",
    buffer: Buffer.from("fake-image"),
  };

  const mockUploadResult = {
    Location: "https://s3.amazonaws.com/bucket/test.jpg",
  };

  const mockFileRecord = {
    id: "1",
    originalname: mockFile.originalname,
    mimetype: mockFile.mimetype,
    url: mockUploadResult.Location,
    size: mockFile.buffer.length,
  };

  beforeAll(() => {
    jest.spyOn(console, "log").mockImplementation(() => {});
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should process image, upload to S3, create DB record and return 201", async () => {
    const req: any = {
      file: mockFile,
      body: {
        customWidth: "1280",
        customHeight: "720",
        targetResolution: "HD",
        keepAspectRatio: "true",
      },
    };
    const res = mockRes();

    (ImageProcessor.resizeImage as jest.Mock).mockResolvedValue(Buffer.from("resized"));
    (uploadToS3 as jest.Mock).mockResolvedValue(mockUploadResult);
    (createFile as jest.Mock).mockResolvedValue(mockFileRecord);

    await processImageHandler(req, res);

    expect(ImageProcessor.resizeImage).toHaveBeenCalled();
    expect(uploadToS3).toHaveBeenCalled();
    expect(createFile).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(mockFileRecord);
  });

  it("should return 400 if file or targetResolution is missing", async () => {
    const res = mockRes();

    await processImageHandler({ body: {}, file: undefined } as any, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: "File and targetResolution are required" });
  });

  it("should return 400 if resizeImage throws aspect ratio error", async () => {
    const req: any = {
      file: mockFile,
      body: {
        customWidth: "1000",
        customHeight: "400",
        targetResolution: "custom",
        keepAspectRatio: "true",
      },
    };
    const res = mockRes();

    (ImageProcessor.resizeImage as jest.Mock).mockRejectedValue(
      new Error("As dimensões distorcem o formato original")
    );

    await processImageHandler(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "Erro ao processar imagem",
      detail: "As dimensões distorcem o formato original",
    });
  });

  it("should return 500 for unexpected error", async () => {
    const req: any = {
      file: mockFile,
      body: {
        customWidth: "1000",
        customHeight: "400",
        targetResolution: "custom",
        keepAspectRatio: "true",
      },
    };
    const res = mockRes();

    (ImageProcessor.resizeImage as jest.Mock).mockRejectedValue(new Error("Falha no S3"));

    await processImageHandler(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: "Erro ao processar imagem",
      detail: "Falha no S3",
    });
  });
});
