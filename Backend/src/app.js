import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();


app.set("trust proxy", 1);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: ["http://localhost:5173",
        "https://interview-master-steel.vercel.app/",
        "https://interview-master-git-master-avnishs-projects-aee706aa.vercel.app/",
        "hhttps://interview-master-bacz7unib-avnishs-projects-aee706aa.vercel.app/"
    ],
    credentials: true,
}));
app.use(morgan('dev'));


/**
 * Requiring routes here 
 */
import authRouter from "./routes/auth.routes.js";
import interviewRouter from "./routes/interview.routes.js";


/**
 * 
 * using  routes here 
 */
app.use('/api/auth', authRouter);
app.use('/api/interview', interviewRouter);

export default app;