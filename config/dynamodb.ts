// config/dynamodb.ts
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const getConfig = () => {
  if (process.env.NODE_ENV === 'production') {
    return {
      region: process.env.AWS_REGION || 'us-west-2'
    };
  } else {
    return {
      region: process.env.AWS_REGION || 'us-west-2',
      endpoint: process.env.DYNAMODB_ENDPOINT || 'http://localhost:8000',
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || 'fakeAccessKeyId',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || 'fakeSecretAccessKey'
      }
    };
  }
};

const client = new DynamoDBClient(getConfig());

const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: {
    convertEmptyValues: true,
    removeUndefinedValues: true,
    convertClassInstanceToMap: true
  }
});

export { client, docClient };