import 'dotenv/config'

import { app } from './app.js';
import connectDB from './db/db.js';

connectDB()
.then(()=>{
    app.on("error",(error)=>{
        console.log("ERR : ",error);
        throw error;
    })
    app.listen(process.env.PORT || 8000, ()=>{
        console.log(`Server is running at port : ${process.env.PORT}`)
    })
})
.catch((err) => {
    console.log("MongoDb connection failed !!");
})