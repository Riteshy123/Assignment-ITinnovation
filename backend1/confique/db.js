import mongoose from "mongoose";

const connectDB = async () => {
//   const url = "mongodb+srv://riteshkumaryadav61054:riteshkumar61054@cluster0.qlwvts9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/UsersTable"
   const url1 = 'mongodb+srv://riteshkumaryadav61054:ritesh61054@cluster0.jvb2kem.mongodb.net/tableuser'
 
 
  try {
    const conn = await mongoose.connect(url1);
    console.log(
      `Conneted To Mongodb Databse ${conn.connection.host}`
    );
  } catch (error) {
    console.log(`Errro in Mongodb ${error}`);
  }
};

export default connectDB;