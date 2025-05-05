import * as controller from "./files.controller.js";
import * as filesService from "../services/files.service.js";

describe("Files Controller", () => {
  const mockRes = () => {
    const res: any = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };

  const mockFile = {
    id: "1",
    originalname: "img.jpg",
    mimetype: "image/jpeg",
    url: "http://localhost/img.jpg",
    size: 1000,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should create a file", async () => {
    const req: any = { body: mockFile };
    const res = mockRes();

    jest.spyOn(filesService, "create").mockResolvedValue(mockFile);

    await controller.create(req, res);

    expect(filesService.create).toHaveBeenCalledWith(mockFile);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(mockFile);
  });

  it("should list all files", async () => {
    const req: any = {};
    const res = mockRes();

    jest.spyOn(filesService, "list").mockResolvedValue([mockFile]);

    await controller.list(req, res);

    expect(filesService.list).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([mockFile]);
  });

  it("should findAll with params", async () => {
    const req: any = { query: { limit: "10", offset: "0" } };
    const res = mockRes();

    jest.spyOn(filesService, "findAll").mockResolvedValue({ data: [mockFile], limit: 10, offset: 0 });

    await controller.findAll(req, res);

    expect(filesService.findAll).toHaveBeenCalledWith(req.query);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ data: [mockFile], limit: 10, offset: 0 });
  });

  it("should find one file", async () => {
    const req: any = { params: { id: "1" } };
    const res = mockRes();

    jest.spyOn(filesService, "findOne").mockResolvedValue(mockFile);

    await controller.findOne(req, res);

    expect(filesService.findOne).toHaveBeenCalledWith("1");
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockFile);
  });

  it("should update a file", async () => {
    const req: any = { params: { id: "1" }, body: mockFile };
    const res = mockRes();

    jest.spyOn(filesService, "update").mockResolvedValue(mockFile);

    await controller.update(req, res);

    expect(filesService.update).toHaveBeenCalledWith("1", mockFile);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockFile);
  });

  it("should remove a file", async () => {
    const req: any = { params: { id: "1" } };
    const res = mockRes();

    jest.spyOn(filesService, "remove").mockResolvedValue(mockFile);

    await controller.remove(req, res);

    expect(filesService.remove).toHaveBeenCalledWith("1");
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockFile);
  });
});
