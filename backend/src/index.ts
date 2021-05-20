import cors from "cors";
import express from "express";
import { Request, Response } from "express";
import listEndpoints from "express-list-endpoints";

import { HttpStatusCode as httpStatusCodes } from "./libs/HttpStatusCode";
import { Logger } from "./libs/log";
import { routes } from "./routes";

import { IConfig } from "./interfaces/Config";
const config: IConfig = require("../config/config.json");

const app = express();

app.use(cors({ origin: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// heartbeat
app.use("/heartbeat", (_: Request, res: Response) => {
  res.status(httpStatusCodes.OK).end();
});

app.use("/api", routes);

// 404 Catcher
app.use((_: Request, res: Response) => {
  res.status(httpStatusCodes.NOT_FOUND).end();
});

// Error Catcher
app.use((err: Error, _: Request, res: Response) => {
  res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).send(err);
});

app.listen(config.Server.port, config.Server.host, () => {
  console.clear();
  console.log("Server working");
  Logger.log(
    `Backend is running: http://${config.Server.host}:${config.Server.port}`
  );
  console.log(listEndpoints(app));
});
