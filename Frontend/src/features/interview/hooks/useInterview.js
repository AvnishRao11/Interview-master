import { generateInterviewReport,getInterviewReportById,getAllInterviewReports,generateResumePdf } from "../services/interview.api.js"; 
import {useContext,useEffect} from "react";
import {InterviewContext} from "../Interview.context.jsx";
import { useParams } from "react-router";
export const useInterview=()=>{
    const context=useContext(InterviewContext);
    const {id}=useParams();

    if(!context){
        throw new Error("useInterview must be used within an InterviewProvider");
    }
    const {loading,setLoading,Report,setReport,Reports,setReports}=context;

    const generateReport=async({resumeFile,selfDescription,jobDescription})=>{
        setLoading(true);
        try{
            const report=await generateInterviewReport({resumeFile,selfDescription,jobDescription});
            setReport(report.interviewReport);
            return report;
        }catch(error){
            
            throw error;
        }
        finally{
            setLoading(false);
        }
    }

    const generateReportById=async(id)=>{
        setLoading(true);
        try{
            const report=await getInterviewReportById(id);
            setReport(report.interviewReport);
            return report;
        }catch(error){
            throw error;
        }
        finally{
            setLoading(false);
        }
    }
    const reports=async()=>{
        setLoading(true);
        try{
            const reports=await getAllInterviewReports();
            setReports(reports.interviewReports);
            return reports;
        }catch(error){
            throw error;
        }
        finally{
            setLoading(false);
        }
        
    }
     const getResumePdf = async (id) => {
        setLoading(true)
        let response = null
        try {
            response = await generateResumePdf( id )
            const url = window.URL.createObjectURL(new Blob([ response ], { type: "application/pdf" }))
            const link = document.createElement("a")
            link.href = url
            link.setAttribute("download", `resume_${id}.pdf`)
            document.body.appendChild(link)
            link.click()
        }
        catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(()=>{
        if(id){
            generateReportById(id);
        }else{
            reports()
        }
    },[id])

    return {loading,setLoading,Report,setReport,Reports,setReports,generateReport,generateReportById,reports,getResumePdf};
}