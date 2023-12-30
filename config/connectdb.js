import mongoose from "mongoose";

const connectdb = async (DATABASE_URI) => {
  try {
    const DB_OPTIONS = {
      //user: "nemysesx",
      //pass: 12345,
      dbName: "mydb",
      //authSource: "mydb",
    };
    await mongoose.connect(DATABASE_URI, DB_OPTIONS);
  } catch (err) {
    console.log(err);
  }
};

export default connectdb;
