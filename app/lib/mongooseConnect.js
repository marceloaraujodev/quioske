import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export async function mongooseConnect(){
  if(mongooseConnect.connection.readyState === 1){
    return mongoose.connection.asPromise();
  }else{
    const uri = process.env.MONGODB_URI;

    if(!uri){
      throw new Error("No MongoDB URI provided.");
    }
    return mongoose.connect(uri).catch((err) => {
      console.error("Error connecting to MongoDB:", err);
      throw err;
    });
  }
}
