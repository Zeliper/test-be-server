import mongoose, { MongooseError, MongooseOptions } from "mongoose";
import { Posts } from "@Schemas/PostsSchema";
import { Comments } from "@Schemas/CommentSchema";

let DBConnection: mongoose.Connection;

export type ConnectionConfig = {
  PORT: number;
  IP: string;
};

const DBConfig: ConnectionConfig = {
  PORT: 27017,
  IP: "localhost",
};

async function ConnectDB() {
  DBConnection = (
    await mongoose.connect(`mongodb://${DBConfig.IP}:${DBConfig.PORT}`)
  ).connection;

  InitializeDB();
}

async function CreateCollection(dbName: string, collectionName: string) {
  DBConnection.useDb(dbName);
  try {
    await DBConnection.createCollection(collectionName);
  } catch (e: any) {
    if (e.codeName == "NamespaceExists") {
      console.log(
        `이미 해당 Collection이 존제합니다 : ${dbName}.${collectionName}`
      );
    } else {
      console.log(e);
    }
  }
}

async function InitializeDB() {
  if (DBConnection.readyState == 1) {
    CreateCollection("test", "posts");
    CreateCollection("test", "comments");
    CreateCollection("test", "authorization");
    for (let i = 0; i < 10; i++) {
      let newPosts = new Comments({
        postDate: Date.now(),
        lastUpdatedDate: Date.now(),
        contents: `히히 댓글${i}`,
        isReply: false,
        authorId: "zeliper",
      });
      await newPosts.save();
    }
  } else {
    console.log("DB is not connected!");
  }
}

export { InitializeDB, ConnectDB };
