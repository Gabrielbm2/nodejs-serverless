import { Table } from "sst/node/table";
import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({});

export async function salvarUsuario(userId: string) {
  await client.send(new PutItemCommand({
    TableName: Table.Files.tableName,
    Item: {
      userId: { S: userId },
    },
  }));
}
