import { PDFParse } from 'pdf-parse';
import { generateInterviewReport,generateResumePdf } from "../services/ai.services.js";
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
        preparationPlan: interviewReportByAi.preparationPlan,
        title: interviewReportByAi.title
    })
    return res.status(200).json({
        message: "Interview report generated successfully",
        interviewReport
    })

}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
export const getInterviewReportByIdController = async (req, res) => {
    const { id } = req.params;
    const interviewReport = await interviewReportModel.findOne({
        _id: id,
        user: req.user.id
    })
    if (!interviewReport) {
        return res.status(404).json({
            message: "Interview report not found"
        })
    }
    return res.status(200).json({
        message: "Interview report retrieved successfully",
        interviewReport
    })
}

export const getAllInterviewReportsController = async (req, res) => {
    const interviewReports = await interviewReportModel.find({
        user: req.user.id
    }).sort({ createdAt: -1 }).select("-resume -selfDescription -jobDescription -__v -tehcnicalQuestions -behavioralQuestions -skillGaps -preparationPlan");
    return res.status(200).json({
        message: "Interview reports retrieved successfully",
        interviewReports
    })
}

/**
 * @description controller to generate the resume pdf based on selfDescription, jobDescription and resume
 */

export const generateResumePdfController = async (req, res) => {
    const { id } = req.params;
    const interviewReport = await interviewReportModel.findById(id);
    if (!interviewReport) {
        return res.status(404).json({
            message: "Interview report not found"
        })
    }
    const {resume,selfDescription,jobDescription}= interviewReport;
    const pdfBuffer=await generateResumePdf({resume,selfDescription,jobDescription});
    res.set({
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename=resume_${id}.pdf`
    });
    return res.status(200).send(pdfBuffer);
}
