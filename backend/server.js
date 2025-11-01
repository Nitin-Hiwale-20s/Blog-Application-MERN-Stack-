
import express from "express";
import dotenv from "dotenv";
import conectDB from "./database/db.js";
import userRoute from "./routes/user.route.js";
import blogRoute from "./routes/blog.route.js";
import cors from "cors";
import commentRoute from "./routes/comment.route.js"
import cookieParser from "cookie-parser";



dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true 
}));

const PORT = process.env.PORT || 3000;

app.use("/api/v1/user", userRoute);
app.use("/api/v1/blog", blogRoute);
app.use("/api/v1/comment",commentRoute );
app.listen(PORT, () => {
    conectDB();
    console.log(`server listen at port ${PORT}`);
});
