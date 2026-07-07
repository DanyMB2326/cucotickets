import express from "express";
import cookieParser from "cookie-parser";

import indexRouter from "./routes/index.routes.js";

import { requestLogger } from "./middlewares/requestLogger.middleware.js";
import { notFoundHandler } from "./middlewares/notFoundHandler.middleware.js";
import { errorHandler } from "./middlewares/errorHandler.middleware.js";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(requestLogger);

app.use("/api", indexRouter);

app.use(notFoundHandler);

app.use(errorHandler);

export default app;