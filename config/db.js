import mongoose from "mongoose";

const connectDB = async () => {
  console.log(`connect Db callled`);

  try {
    mongoose.connection.on("connected", () => {
      console.log(`mongoose connected to DB`);
    });

    mongoose.connection.on("error", (error) => {
      console.log(`mongoose connection error ${error.message}`);
    });
    // connecting to mongo db
    await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDb Connected.`);
  } catch (error) {
    console.error(`MongoDb Connection Error : ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
