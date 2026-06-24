import axios from "axios";
import api from "../../auth/services/auth.api.js";


export const generateInterviewReport=async({resumeFile,selfDescription,jobDescription})=>{
    const formData=new FormData();
    formData.append("resume",resumeFile);
    formData.append("selfDescription",selfDescription);
    formData.append("jobDescription",jobDescription);
    const response=await api.post("/api/interview",formData,{
        headers:{
            "Content-Type":"multipart/form-data"
        }
    })
    return response.data;
}

export const getInterviewReportById=async(id)=>{
    const response=await api.get(`/api/interview/report/${id}`);
    return response.data;
}

export const getAllInterviewReports=async()=>{
    const response=await api.get("/api/interview");
    return response.data;
}   