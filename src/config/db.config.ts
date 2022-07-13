import mongoose from "mongoose";
import Grid from "gridfs-stream";

const setupDbConnection = (): Promise<typeof mongoose> => {
  const dbURI: string | undefined = process.env.DB_URI;
  const options = {
    autoCreate: false,
    autoIndex: false,
  }; // @ts-ignore
  const connection = mongoose.connect(dbURI, options);
  const db = mongoose.connection;
  mongoose.connection
    .once("connected", () => {
      // @ts-ignore
      const gfs = new Grid(db.db, mongoose.mongo);
      gfs.collection("uploads");
      console.log("DB is connected...");
    })
    .on("error", (error) => {
      console.log(`Error connecting to DB: ${JSON.stringify(error)}`);
    })
    .on("disconnected", () => {
      console.log("Disconnected from DB.");
    });
  process.on("SIGINT", async () => {
    await mongoose.connection.close();
    process.exit(0);
  });
  return connection;
};

export default setupDbConnection;
