import express from 'express'
import { connectionDB } from './DB/connection.js'
import userRouter from './src/modules/user/user.router.js'
import companyRouter from './src/modules/company/company.router.js'
import jobRouter from './src/modules/job/job.router.js'
import dotenv from 'dotenv'
import applicationRouter from './src/modules/application/application.router.js'
dotenv.config();
const app = express()
const port = process.env.PORT;
app.use(express.json())

//^  DB Connect
connectionDB()

//^ user Api
app.use("/user",userRouter)

//^ company Api
app.use("/company",companyRouter)

//^ job Api
app.use("/job",jobRouter)

//^ Application Api
app.use("/application",applicationRouter)


app.all("*",(req,res,next)=>{
    return res.json({
        success:false,
        message:"page not found"
    })
})

//^ global error
app.use((error,req,res,next)=>{
    return res.json({
        success:false,
        messsage:error.message,
        stack:error.stack
    })
})



app.listen(port, () => console.log(`App listening on port ${port}!`))