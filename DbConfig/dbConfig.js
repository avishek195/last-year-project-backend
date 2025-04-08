import mongoose from "mongoose";

const dbConnection = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    if (conn) {
      console.log("DB Connected");
    }
  } catch (error) {
    console.log("Something went wrong");
  }
};

export default dbConnection;
