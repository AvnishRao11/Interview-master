import { Router } from "express"
import * as middleware from "../middlewares/auth.middleware.js"
import * as interviewController from "../controllers/interview.controller.js"
import upload from "../middlewares/file.midlleware.js"

const interviewRouter=Router();


/**
 * @route POST /api/interview
 * @desc Generate an interview report based on the candidate's resume, self-description, and job description
 * @access Private
 */
interviewRouter.post("/",middleware.authMiddleware,upload.single("resume"),interviewController.generateInterviewReportController);

/**
 * @route GET /api/interview/report/:id
 * @desc Get a specific interview report by its ID
 * @access Private
 */
interviewRouter.get("/report/:id",middleware.authMiddleware,interviewController.getInterviewReportByIdController);

/**
 * @route GET /api/interview/
 * @desc Get all interview reports for the authenticated user
 * @access Private
 */
interviewRouter.get("/",middleware.authMiddleware,interviewController.getAllInterviewReportsController);
 

export default interviewRouter;
