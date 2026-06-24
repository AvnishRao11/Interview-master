import {createContext, useContext, useState} from "react";


export const InterviewContext=createContext()

export const InterviewProvider=({children})=>{
    const[loading,setLoading]=useState(false);
    const[Report,setReport]=useState(null);
    const[Reports,setReports]=useState([]);
   
    return(
        <InterviewContext.Provider value={{loading,setLoading,Report,setReport,Reports,setReports}}>
            {children}
        </InterviewContext.Provider>
    )
}