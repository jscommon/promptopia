import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

//   console.log(process.env.MONGODB_URI);
//   console.log("1st line");

  if (isConnected) {
    console.log('\x1b[43m%s\x1b[0m',"MongoDB is already connected`");
    return;
  }
//   console.log("after isconnected");

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "share_prompt",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = true;
    console.log('\x1b[42m%s\x1b[0m',"MongoDB is connected");
  } catch (error) {
    console.log(error);
  }

//   console.log("is connected :"+isConnected);
//   console.log("at the end ***************************"); 
};
