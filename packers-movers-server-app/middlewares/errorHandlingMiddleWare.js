import express from "express";
import { MongooseError } from "mongoose";

// not found error middle ware
const notFound = (req, resp, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  console.error(`404 Not Found : ${req.originalUrl}`);
  resp.status(404);
  next(error);
};

const errorHandler = (error, req, resp, next) => {
  let statusCode = resp.statusCode === 200 ? 500 : resp.statusCode;
  let messge = error.messge;
  let errorDetails = {};
  // handling mongodb Errors
  if (error instanceof MongooseError.CastError) {
    if (error.path == -"_id") {
      messge = `Invalid id format : ${error.value} . Please provide the valid MongoDb Object Id`;
      (statusCode = 400),
        (errorDetails = {
          providedValue: err.value,
          expectedType: "MongoDB ObjectId",
          path: err.path,
          kind: err.kind,
        });
    } else if (error.name === "ValidationError") {
      statusCode = 400;
      const errors = {};
      Object.keys(error.errors).forEach((key) => {
        errors[key] = error.errors[key].messge;
      });
      messge = "Validation Failed";
      errorDetails = { errors };
    }
  }

  console.error({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
    status: statusCode,
    path: req.originalUrl,
    method: req.method,
    ip: req.ip,
    name: err.name,
    ...(err instanceof MongooseError.CastError && {
      kind: err.kind,
      value: err.value,
      path: err.path,
      reason: err.reason?.message,
    }),
  });

  // Prepare response
  const response = {
    success: false,
    message,
    ...(Object.keys(errorDetails).length > 0 && { details: errorDetails }),
  };

  // Send response
  res.status(statusCode).json(response);
};

export default {
  notFound,
  errorHandler,
};
