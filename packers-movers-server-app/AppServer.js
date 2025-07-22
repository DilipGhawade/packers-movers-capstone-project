import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoute.js"; // Ensure the path is correct
import contactRoutes from "./routes/contactRoute.js";
import serviceRoute from "./routes/serviceRoute.js";
import quickQuote from "./routes/quoteRoutes.js";
import {
  notFound,
  errorHandler,
} from "./middlewares/errorHandlingMiddleWare.js";

// load env
dotenv.config();
// connecting to the mongodb database
connectDB();
// initializing the express
const app = express();
// creating the server
// const server = createServer(app);

// add body parser to app
app.use(express.json());

// access for static folder is added
app.use("/uploads", express.static("uploads"));

// adding the middleware for error handling

app.use("/api/users/", userRoutes);
app.use("/api/users/", contactRoutes);
app.use("/api", serviceRoute);
app.use("/api", quickQuote);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 7000;

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
