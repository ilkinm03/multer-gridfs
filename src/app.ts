import "dotenv/config";
import express, { Application } from "express";
import bodyParser from "body-parser";
import http, { Server } from "http";
import router from "./routes/router";
import setupDbConnection from "./config/db.config";

const app: Application = express();
const server: Server = http.createServer(app);
const PORT: string | 3000 = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));

router(app);

setupDbConnection().then(() => {
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`);
  });
});
