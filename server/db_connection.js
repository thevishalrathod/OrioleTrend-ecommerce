import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

// "mongodb+srv://rathodvishal016:dpSFQ2zf6QU2aml0@cluster0.dhmnvs8.mongodb.net/"

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Database connected successfuly!");
  })
  .catch((error) => {
    console.log("ERROR IN DATABASE CONNECTION", error);
  });
