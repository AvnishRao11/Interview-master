import { GoogleGenAI } from "@google/genai";
import { z } from "zod";
import config from "../config/config.js"

const ai = new GoogleGenAI({
    apiKey: config.GOOGLE_GEMINI_API_KEY
});

const interviewReportSchema = z.object({
    matchScore: z.number().describe("A score between 0 and 100 indicating how well the candidate's resume and self-description match the job description"),

    technicalQuestions: z.array(z.object({
        question: z.string().describe("A technical question relevant to the job description"),
        intention: z.string().describe("The intention behind the question"),
        answer: z.string().describe("how to answer , what points to cover , what approach to take etc")
    })).describe("A list of technical questions, their intentions, and how to answer them"),

    behavioralQuestions: z.array(z.object({
        question: z.string().describe("A behavioral question relevant to the job description"),
        intention: z.string().describe("The intention behind the question"),
        answer: z.string().describe("how to answer , what points to cover , what approach to take etc")
    })).describe("A list of behavioral questions, their intentions, and how to answer them"),

    skillGaps: z.array(z.object({
        skill: z.string().describe("A skill that the candidate is lacking based on the resume and job description"),
        severity: z.enum(["low", "medium", "high"]).describe("The severity of the skill gap")
    })).describe("A list of skill gaps identified from the resume and job description, along with their severity"),

    preparationPlan: z.array(z.object({
        day: z.number().describe("The day number in the preparation plan"),
        focus: z.string().describe("The main focus for that day in the preparation plan"),
        tasks: z.array(z.string()).describe("A list of tasks to complete on that day for preparation")
    })).describe("A day-wise preparation plan with focus areas and tasks to complete each day")

})

const schema = z.toJSONSchema(interviewReportSchema);


export async function generateInterviewReport({ resume, selfDescription, jobDescription }) {

    const prompt = `Generate  an interview report for a candidate based on the following information:
                    Resume: ${resume}
                    Self Description: ${selfDescription}
                    Job Description: ${jobDescription}`

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: schema,

        }
    })
    const result =JSON.parse(response.text);
    return result ;
}
