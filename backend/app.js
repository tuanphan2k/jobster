import dotenv from "dotenv";
import "express-async-errors";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import xss from "xss-clean";
import rateLimiter from "express-rate-limit";

import authRouter from "./routes/auth.js";
import jobRouter from "./routes/job.js";
import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";
import connectDB from "./db/connect.js";
import authenticateUser from "./middleware/authentication.js";

const app = express();

dotenv.config();

//middleware
app.set("trust proxy", 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, //15 minutes
    max: 100, //limit each IP to 100 requests pre windowMs
  })
);
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());
// extra packages

//routers
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", authenticateUser, jobRouter);

// error handlers
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI || "");
    app.listen(port, () =>
      // eslint-disable-next-line no-console
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
};

start();
