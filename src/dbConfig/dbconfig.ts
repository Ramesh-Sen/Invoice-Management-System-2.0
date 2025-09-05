import mongoose from "mongoose";

export async function connect(): Promise<typeof mongoose | void> {
  try {
    // mongoose.set('debug', true);
    const db = await mongoose.connect(`${process.env.MONGO_URL}`, {
      dbName: process.env.DB_NAME,
    });
    console.log("MongoDB Connected Successfully");
    return db;
  } catch (err) {
    console.log("MongoDB Connection Error. Please make sure MongoDB is running. " + err);
    console.log(err);
  }
}
