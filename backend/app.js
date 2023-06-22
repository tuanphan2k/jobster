import dotenv from "dotenv";
import "express-async-errors";
import express from "express";

import authRouter from "./routes/auth.js";
import jobRouter from "./routes/job.js";
import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";
import connectDB from "./db/connect.js";
import authenticateUser from "./middleware/authentication.js";

const app = express();

dotenv.config();

//middleware
app.use(express.json());
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
