import dotenv from "dotenv"

dotenv.config();
if(!process.env.PORT){
    throw new Error("PORT is not defined in the environment variables");
}
if(!process.env.MONGO_URI){
    throw new Error("MONGO_URI is not defined in the environment variables");
}
if(!process.env.JWT_SECRET){
    throw new Error("JWT_SECRET is not defined in the environment variables");
}
if(!process.env.GOOGLE_GEMINI_API_KEY){
    throw new Error("GOOGLE_GEMINI_API_KEY is not defined in the environment variables");
}
const config={
    PORT:process.env.PORT,
    MONGO_URI:process.env.MONGO_URI,
    JWT_SECRET:process.env.JWT_SECRET,
    GOOGLE_GEMINI_API_KEY:process.env.GOOGLE_GEMINI_API_KEY
}

export default config;