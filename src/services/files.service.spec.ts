import * as filesService from "./files.service.js";
import { pool } from "../database/connection.js";

jest.mock("../database/connection.js", () => ({
  pool: {
    query: jest.fn(),
  },
}));

describe("Files Service", () => {
  const mockFile = {
    originalname: "photo.jpg",
    mimetype: "image/jpeg",
    url: "https://example.com/photo.jpg",
    size: 12345,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should create a file", async () => {
    (pool.query as jest.Mock).mockResolvedValue({ rows: [{ id: "1", ...mockFile }] });

    const result = await filesService.create(mockFile);

    expect(pool.query).toHaveBeenCalledWith(
      "INSERT INTO files (originalname, mimetype, url, size) VALUES ($1, $2, $3, $4) RETURNING *",
      [mockFile.originalname, mockFile.mimetype, mockFile.url, mockFile.size]
    );

    expect(result).toEqual({ id: "1", ...mockFile });
  });

  it("should list all files", async () => {
    (pool.query as jest.Mock).mockResolvedValue({ rows: [mockFile] });

    const result = await filesService.list();

    expect(pool.query).toHaveBeenCalledWith("SELECT * FROM files");
    expect(result).toEqual([mockFile]);
  });

  it("should find all with pagination", async () => {
    const params = { limit: "5", offset: "10" };
    (pool.query as jest.Mock).mockResolvedValue({ rows: [mockFile] });

    const result = await filesService.findAll(params);

    expect(pool.query).toHaveBeenCalledWith(
      "SELECT * FROM files LIMIT $1 OFFSET $2",
      [5, 10]
    );
    expect(result).toEqual({ data: [mockFile], limit: 5, offset: 10 });
  });

  it("should find one file", async () => {
    (pool.query as jest.Mock).mockResolvedValue({ rows: [{ id: "1", ...mockFile }] });

    const result = await filesService.findOne("1");

    expect(pool.query).toHaveBeenCalledWith(
      "SELECT * FROM files WHERE id = $1",
      ["1"]
    );
    expect(result).toEqual({ id: "1", ...mockFile });
  });

  it("should throw if file not found", async () => {
    (pool.query as jest.Mock).mockResolvedValue({ rows: [] });

    await expect(filesService.findOne("123")).rejects.toThrow("File not found");
  });

  it("should update a file", async () => {
    (pool.query as jest.Mock).mockResolvedValue({ rows: [{ id: "1", ...mockFile }] });

    const result = await filesService.update("1", mockFile);

    expect(pool.query).toHaveBeenCalledWith(
      "UPDATE files SET originalname=$1, mimetype=$2, url=$3, size=$4 WHERE id=$5 RETURNING *",
      [
        mockFile.originalname,
        mockFile.mimetype,
        mockFile.url,
        mockFile.size,
        "1",
      ]
    );
    expect(result).toEqual({ id: "1", ...mockFile });
  });

  it("should remove a file", async () => {
    (pool.query as jest.Mock).mockResolvedValue({ rows: [{ id: "1", ...mockFile }] });

    const result = await filesService.remove("1");

    expect(pool.query).toHaveBeenCalledWith(
      "DELETE FROM files WHERE id = $1 RETURNING *",
      ["1"]
    );
    expect(result).toEqual({ id: "1", ...mockFile });
  });
});
