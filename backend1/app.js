import express from 'express';
import cors from "cors";
import connectDB from './confique/db.js';
import authRoutes from './routers/authRouter.js'




connectDB();
const app = express();



app.use(cors());
app.use(express.json());


app.use("/api/v1/auth", authRoutes);


const port = 8080;

app.listen(port,()=>{
     console.log(`server is running at port ${port}`)
})