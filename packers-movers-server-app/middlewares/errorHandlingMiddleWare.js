import { MongooseError } from "mongoose";

// not found error middleware
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  console.error(`404 Not Found : ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (error, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = error.message;
  let errorDetails = {};

  // Handle Mongoose CastError (invalid ObjectId)
  if (error instanceof MongooseError.CastError) {
    if (error.path === "_id") {
      message = `Invalid id format: ${error.value}. Please provide a valid MongoDB ObjectId`;
      statusCode = 400;
      errorDetails = {
        providedValue: error.value,
        expectedType: "MongoDB ObjectId",
        path: error.path,
        kind: error.kind,
      };
    }
  } else if (error.name === "ValidationError") {
    statusCode = 400;
    const errors = {};
    Object.keys(error.errors).forEach((key) => {
      errors[key] = error.errors[key].message;
    });
    message = "Validation Failed";
    errorDetails = { errors };
  }

  console.error({
    message: error.message,
    stack: process.env.NODE_ENV === "production" ? null : error.stack,
    status: statusCode,
    path: req.originalUrl,
    method: req.method,
    ip: req.ip,
    name: error.name,
    ...(error instanceof MongooseError.CastError && {
      kind: error.kind,
      value: error.value,
      path: error.path,
      reason: error.reason?.message,
    }),
  });

  // Prepare response
  const response = {
    success: false,
    message,
    ...(Object.keys(errorDetails).length > 0 && { details: errorDetails }),
  };

  res.status(statusCode).json(response);
};

export { notFound, errorHandler };
