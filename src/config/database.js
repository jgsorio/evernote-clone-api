import { config } from "dotenv";
import mongoose from "mongoose";
config();

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Connected"))
    .catch(err => console.log(err));

export default mongoose;