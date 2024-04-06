import { Application } from "../../../DB/models/application.model.js"
import { Company } from "../../../DB/models/company.model.js"
import { Job } from "../../../DB/models/job.model.js"
import { asyncHandler } from "../../utils/asyncHandler.js"
import cloudinary from "../../utils/cloud.js"

// ^ Application
export const addApplication=asyncHandler(async(req,res,next)=>{
    const job =await Job.findOne({addedBy:req.payload.id})

    if(!job)
        return next(new Error("no application related with this jobs"))

    await Application.create({
        userSoftSkills:req.body.userSoftSkills,
        userTechSkills:req.body.userSoftSkills,
        userId:req.payload.id,
        jobId:job._id,
    })

    return res.json({
        success:true,
        message:"Application created successfully",
    })
})

// ^ upload Doc
export const uploadDoc=asyncHandler(async(req,res,next)=>{
    const userId=req.payload.id;
    const {secure_url,public_id} =await cloudinary.uploader.upload(req.file.path);
    const application=await Application.findOneAndUpdate({userId},{userResume:{secure_url,public_id}})
    return res.json({
        success:true,
        message:"file uploaded successfully"
    })
})

// ^ all Application

export const allApplication=asyncHandler(async(req,res,next)=>{
    const {jobId}=req.params;
    const companyOwner=await Company.find({companyHR:req.payload.id})
    if(!companyOwner)
        return next(new Error("You are not the owner of this job"))

    const application =await Application.find({jobId}).populate(
        {
            path:"userId",
            select:"password"
        }
    )
    if(!application)
        return next(new Error("The application is not exist"))
    return res.json({
        success:true,
        application
    })
})