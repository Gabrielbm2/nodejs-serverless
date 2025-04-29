import {
    StackContext,
    Api,
    Function as SSTFunction,
    Bucket,
    Table,
  } from "sst/constructs";
  
  export function MyStack({ stack }: StackContext) {
    const filesTable = new Table(stack, "Files", {
        fields: {
          id: "string",
          originalname: "string",
          mimetype: "string",
          url: "string",
          size: "number",
          created_at: "string",
        },
        primaryIndex: { partitionKey: "id" },
      });
  
    const bucket = new Bucket(stack, "UploadsBucket", {
      cors: [
        {
          allowedMethods: ["GET", "PUT"],
          allowedOrigins: ["*"],
          allowedHeaders: ["*"],
        },
      ],
    });
  
    // Lambda com Express (upload + arquivos)
    const expressFunction = new SSTFunction(stack, "ExpressFunction", {
      handler: "src/upload-server.handler",
      runtime: "nodejs18.x",
      memorySize: 1024,
      timeout: 10,
      bind: [filesTable, bucket],
      environment: {
        BUCKET_NAME: bucket.bucketName,
      },
    });
  
    // API Gateway
    const api = new Api(stack, "Api", {
      routes: {
        "ANY /{proxy+}": expressFunction, // tudo passa pelo Express
      },
    });
  
    stack.addOutputs({
      ApiUrl: api.url,
      BucketName: bucket.bucketName,
      TableName: filesTable.tableName,
    });
  }
  