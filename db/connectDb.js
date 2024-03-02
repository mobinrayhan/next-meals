import { MongoClient } from "mongodb";

export async function connectingDatabase() {
  const client = await MongoClient.connect(
    `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.j9zvp3j.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
  );
  return client;
}
