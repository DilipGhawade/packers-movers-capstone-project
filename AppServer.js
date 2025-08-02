import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoute.js"; // Ensure the path is correct
import contactRoutes from "./routes/contactRoute.js";
import serviceRoute from "./routes/serviceRoute.js";
import quickQuote from "./routes/quoteRoutes.js";
import priceRoute from "./routes/priceRoute.js";
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
// CORS headers (open to all)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// access for static folder is added
app.use("/uploads", express.static("uploads"));

// adding the middleware for error handling

app.use("/api/users/", userRoutes);
app.use("/api/users/", contactRoutes);
app.use("/api", serviceRoute);
app.use("/api", quickQuote);
app.use("/api", priceRoute);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 7000;

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
