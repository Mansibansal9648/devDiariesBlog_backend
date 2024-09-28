import mongoose from "mongoose";

const dbConnection = async () => {
  const url = process.env.DB_URL;
  const db_name = process.env.DEV_DIARY_BLOG;
  try {
    await mongoose.connect(
      `${url}/${db_name}`
    );
    console.info("Yippee!! DB connection established 🗂️ 🗂️");
  } catch (e) {
    console.info("😞😞 Server Error");
    throw e
  }
};
export default dbConnection;
