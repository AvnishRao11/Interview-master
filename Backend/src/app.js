import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('dev'));


/**
 * Requiring routes here 
 */
import authRouter from "./routes/auth.routes.js";

/**
 * using  routes here 
 */
app.use('/api/auth',authRouter);

export default app;