import { Application } from "express";
import uploadRouter from "./upload.router";

export default (app: Application) => {
  app.use("/", uploadRouter);
}