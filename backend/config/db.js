import mongoose from "mongoose"

const connectDB = async() => (

   await mongoose.connect(process.env.MONGO_URL)
   .then((res) =>{
    console.log("MongoDB is connected successfully");
   })
   .catch((error) =>{
    console.log(`MongoDB connection failed ${error}`);
   console.log("");
})
   
)
export default connectDB