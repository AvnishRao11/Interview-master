import app from "./src/app.js";
import config from "./src/config/config.js";
import connectDB from "./src/config/Database.js";
const port = config.PORT ;

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})
connectDB();

app.get('/',(req,res)=>{
    res.send("Server is running");

})

