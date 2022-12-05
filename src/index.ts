import Model from "src/modules/Model";
import express, { Request, Response, NextFunction } from "express";
import * as DBUtilityService from "src/services/DBUtilityService";

const app = express();
app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("welcome!");
});

app.get("/Init", async (req: Request, res: Response, next: NextFunction) => {
  await DBUtilityService.InitializeDB();
  res.send("Initialize!");
});

DBUtilityService.ConnectDB().then(() => {
  console.log("DB Connection Successed!");
});

app.listen("3000", () => {
  console.log(`
  ################################################
  🛡️  Server listening on port: 3000
      Connect to : http://localhost:3000
  ################################################
`);
});
