import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import router from "./src/routes/index.js";
import cookieParser from "cookie-parser";
import { errorHandler } from "./src/middlewares/errorMiddleware.js";

dotenv.config();
const { PORT, MONGO_URL } = process.env;

const app = express();
app.use(express.json());
// app.use(errorHandler);

app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: "*",
    exposedHeaders: ["set-cookie"],
  })
);

mongoose.connect(`${MONGO_URL}`).then(() => console.log("Database Connected!"));
app.use("/api/v1", router);
const port = 8000; // default port to listen

// start the Express server
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});

// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "http://localhost:5173");
//   res.header("Access-Control-Allow-Credentials", true);
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });
