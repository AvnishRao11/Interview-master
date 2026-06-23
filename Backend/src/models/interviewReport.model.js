import mongoose from "mongoose";

/**
 * user will provide : 
 * 
 * Job Description :String
 * resume text :String
 * self description:String
 * 
 * 
 * Match Score:Number
 * 
 * 
 * -Technical questions :[{
 *  question : "",
 *   intention : "",
 *  answer : "",
 * }]
 * 
 * -Behavioral questions :[{
 * question : "",
 * intention : "",
 * answer : "",
 * }]
 * 
 * -skill gaps :[{
 *  skill : "",
 *  severity : {
 *   type : String,
 *  enum : ["low","medium","high"]
 * }}
 * ]
 * -prepration plan :[{
 *      day : Number,
 *      focus : String,
 *     tasks:[String] 
 * }]
 * 
 */
const technicalQuestionsSchema=new mongoose.Schema({
    question:{
        type:String,
        required:[true,"Question is required"]
    },intention:{
        type:String,
        required:[true,"Intention is required"]
    },
    answer:{
        type:String,
        required:[true,"Answer is required"]
    }
},{
    _id:false
})

const behavioralQuestionsSchema=new mongoose.Schema({
    question:{
        type:String,
        required:[true,"Question is required"]
    },intention:{
        type:String,
        required:[true,"Intention is required"]
    },
    answer:{
        type:String,
        required:[true,"Answer is required"]
    }
},{
    _id:false
})
const skillGapSchema=new mongoose.Schema({
    skill:{
        type:String,
        required:[true,"Skill is required"]
    },
    severity:{
        type:String,
        enum:["low","medium","high"],
    }
},{
    _id:false
})

const preparationPlanSchema=new mongoose.Schema({
    day:{
        type:Number,
        required:[true,"Day is required"]
    },
    focus:{
        type:String,
        required:[true,"Focus is required"]
    },
    tasks:[{
        type:String,
        required:[true,"Task is required"]
    }]
},{
    _id:false
})

const interviewReportSchema=new mongoose.Schema({
    jobDescription:{
        type:String,
        required:[true,"Job Description is required"]

    },
    resume:{
        type:String
    },
    selfDescription:{
        type:String,

    },
    matchScore:{
        type:Number,
        min:0,
        max:100
    },
    technicalQuestions:[technicalQuestionsSchema],
    behavioralQuestions:[behavioralQuestionsSchema],
    skillGaps:[skillGapSchema],
    preparationPlan:[preparationPlanSchema],
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    }

},{
    timestamps:true
})

const interviewReportModel=mongoose.model("InterviewReport",interviewReportSchema);

export default interviewReportModel;