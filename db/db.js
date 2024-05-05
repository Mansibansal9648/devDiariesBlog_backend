import mongoose from "mongoose";

const dbConnection = async () => {
  const url = process.env.DB_URL;
  try {
    await mongoose.connect(
      url
      // {
      //  useNewUrlParser:true,
      //  useCreateIndex:true,
      // useUnifiedTopology:true,
      // useFindAndModify:false},
    );
    console.log("Connected to database successfully");
  } catch (e) {
    console.log(e);
    console.log("Can not connect to database");
  }
};
export default dbConnection;
