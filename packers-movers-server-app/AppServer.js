import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import { createServer } from "http";
import * as userController from "./controllers/userController.js";

// load env
dotenv.config();
// connecting to the mongodb database
connectDB();
// initializing the express
const app = express();
// creating the server
const server = createServer(app);

// add body parser to app
app.use(express.json());

// adding the middleware for error handling

// app.use(notfound);
// app.use(errorHandler);

const PORT = process.env.PORT || 7000;

const serverInstance = server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
