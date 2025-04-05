import { CreateTableCommand } from "@aws-sdk/client-dynamodb";
import { client } from "../config/dynamodb";

async function createTables() {
  try {
    await client.send(new CreateTableCommand({
      TableName: "Users",
      KeySchema: [
        { AttributeName: "username", KeyType: "HASH" }
      ],
      AttributeDefinitions: [
        { AttributeName: "username", AttributeType: "S" }
      ],
      ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5
      }
    }));
    console.log("Users table created");

    await client.send(new CreateTableCommand({
      TableName: "UserOrders",
      KeySchema: [
        { AttributeName: "username", KeyType: "HASH" },
        { AttributeName: "orderId", KeyType: "RANGE" }
      ],
      AttributeDefinitions: [
        { AttributeName: "username", AttributeType: "S" },
        { AttributeName: "orderId", AttributeType: "S" }
      ],
      ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5
      }
    }));
    console.log("UserOrders table created");

    await client.send(new CreateTableCommand({
      TableName: "UserPayouts",
      KeySchema: [
        { AttributeName: "username", KeyType: "HASH" },
        { AttributeName: "payoutId", KeyType: "RANGE" }
      ],
      AttributeDefinitions: [
        { AttributeName: "username", AttributeType: "S" },
        { AttributeName: "payoutId", AttributeType: "S" }
      ],
      ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5
      }
    }));
    console.log("UserPayouts table created");

    await client.send(new CreateTableCommand({
      TableName: "UserInsights",
      KeySchema: [
        { AttributeName: "username", KeyType: "HASH" },
        { AttributeName: "insightId", KeyType: "RANGE" }
      ],
      AttributeDefinitions: [
        { AttributeName: "username", AttributeType: "S" },
        { AttributeName: "insightId", AttributeType: "S" }
      ],
      ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5
      }
    }));
    console.log("UserInsights table created");

    console.log("All tables created successfully");
  } catch (error) {
    console.error("Error creating tables:", error);
  }
}

createTables();