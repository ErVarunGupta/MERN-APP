import mongoose from 'mongoose';

const mongo_url = process.env.MONGO_CONN;

mongoose.connect(mongo_url)
.then(()=>{
    console.log("mongodb is connected...")
}).catch((err)=>{
    console.log("mongodb connection error: ", err)
})