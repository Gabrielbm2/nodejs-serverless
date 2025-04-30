import { Table } from "sst/node/table";
import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({});

export async function salvarUsuario(fileId: string) {
await client.send(new PutItemCommand({
  TableName: Table.Files.tableName,
  Item: {
    id: { S: fileId },
    originalname: { S: "placeholder" },
    mimetype: { S: "placeholder" },
    url: { S: "placeholder" },
    size: { N: "0" },
    created_at: { S: new Date().toISOString() },
  },
}));

}
