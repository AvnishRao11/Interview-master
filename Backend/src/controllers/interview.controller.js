import { PDFParse } from 'pdf-parse';
import { generateInterviewReport } from "../services/ai.services.js";
import interviewReportModel from "../models/interviewReport.model.js"


export const generateInterviewReportController = async (req, res) => {
    
    const resumeContent = await (new PDFParse(Uint8Array.from(req.file.buffer))).getText();
    const { selfDescription, jobDescription } = req.body;

    const interviewReportByAi = await generateInterviewReport({
        resume: resumeContent.text,
        selfDescription,
        jobDescription
    })
    console.log("interviewReportByAi", interviewReportByAi);
    const interviewReport = await interviewReportModel.create({
        user: req.user.id,
        resume: resumeContent.text,
        selfDescription,
        jobDescription,
        matchScore: interviewReportByAi.matchScore,
        technicalQuestions: interviewReportByAi.technicalQuestions,
        behavioralQuestions: interviewReportByAi.behavioralQuestions,
        skillGaps: interviewReportByAi.skillGaps,
        preparationPlan: interviewReportByAi.preparationPlan
    })
    return res.status(200).json({
        message: "Interview report generated successfully",
        interviewReport
    })

}
