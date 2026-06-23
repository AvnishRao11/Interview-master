import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use(morgan('dev'));


/**
 * Requiring routes here 
 */
import authRouter from "./routes/auth.routes.js";
import interviewRouter from "./routes/interview.routes.js";

/**
 * using  routes here 
 */
app.use('/api/auth',authRouter);
app.use('/api/interview',interviewRouter);

export default app;