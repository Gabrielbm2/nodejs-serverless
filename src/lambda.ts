import { Table } from "sst/node/table";
import { APIGatewayProxyHandler } from "aws-lambda";
import { DynamoDBClient, PutItemCommand, GetItemCommand } from "@aws-sdk/client-dynamodb";
import { v4 as uuid } from "uuid";

const db = new DynamoDBClient({});

export const handler: APIGatewayProxyHandler = async (event) => {
  if (event.httpMethod === "POST") {
    const body = JSON.parse(event.body!);
    const id = uuid();

    await db.send(new PutItemCommand({
      TableName: Table.Files.tableName,
      Item: {
        id: { S: id },
        originalname: { S: body.originalname },
        mimetype: { S: body.mimetype },
        url: { S: body.url },
        size: { N: String(body.size) },
        created_at: { S: new Date().toISOString() },
      },
    }));

    return {
      statusCode: 201,
      body: JSON.stringify({ id }),
    };
  }

  if (event.httpMethod === "GET" && event.pathParameters?.id) {
    const result = await db.send(new GetItemCommand({
      TableName: Table.Files.tableName,
      Key: {
        id: { S: event.pathParameters.id },
      },
    }));

    if (!result.Item) {
      return {
        statusCode: 404,
        body: "Not found",
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(result.Item),
    };
  }

  return {
    statusCode: 400,
    body: "Invalid request",
  };
};
