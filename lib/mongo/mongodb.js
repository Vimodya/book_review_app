import mongoose from "mongoose";

const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB successfully.");
  } catch (error) {
    console.error("DB connection error:", error);
    throw new Error("Failed to connect to MongoDB.");
  }
};

export default connectMongoDB;
