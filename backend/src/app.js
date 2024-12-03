import express from "express"
import cors from "cors";
import cookieParser from "cookie-parser"

const app = express();

//cross origin resource sharing
// used to connect frontend with backend
app.use(cors({
    origin : process.env.CORS_ORIGIN,
    credentials : true
}))

app.use(express.json({limit : "16kb"}))
app.use(express.urlencoded({extended : true}));
app.use(express.static("public")) // to store static files like images etc
app.use(cookieParser());

export {app};