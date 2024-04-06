import { Company } from "../../../DB/models/company.model.js";
import { Job } from "../../../DB/models/job.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

export const addJob=asyncHandler(async(req,res,next)=>{
    const company=await Company.findOne({companyHR:req.payload.id})
    const job=await Job.create({
            jobTitle:req.body.jobTitle,
            jobDescription:req.body.jobDescription,
            workingTime:req.body.workingTime,
            seniorityLevel:req.body.seniorityLevel,
            jobLocation:req.body.jobLocation,
            technicalSkills:req.body.technicalSkills,
            softSkills:req.body.softSkills,
            addedBy:req.payload.id,
            company:company._id,
        })
    
    if(!job)
        return next(new Error("Job not exist"));

    return res.json({
        success:true,
        message:"The job added successfully"
    })
})

export const updateJob=asyncHandler(async(req,res,next)=>{
    const {id}=req.params;
    const {jobTitle,jobLocation,workingTime,seniorityLevel,jobDescription,technicalSkills,softSkills} =req.body;

    const job=await Job.findById(id);

    if(!job)
        return next(new Error("The job is not exist"));

    if(jobTitle) job.jobTitle=jobTitle
    if(jobLocation) job.jobLocation=jobLocation
    if(workingTime) job.workingTime=workingTime
    if(seniorityLevel) job.seniorityLevel=seniorityLevel
    if(technicalSkills) job.technicalSkills=technicalSkills
    if(softSkills) job.softSkills=softSkills

    await job.save()
    return res.json({
        success:true,
        message:"The job updated successfully"
    })

})

export const deleteJob=asyncHandler(async (req,res,next)=>{
    const {id}=req.params;
    const job= await Job.findByIdAndDelete(id);

    if(!job)
        return next(new Error("The job is not exist"));

    return res.json({
        success:true,
        message:"The job deleted successfully"
    })
})

export const allJob=asyncHandler(async(req,res,next)=>{
    const jobs=await Job.find().populate("company");
    if(!jobs)
        return next(new Error("The jobs are not exists"))
    return res.json({
        success:true,
        jobs,
    })
})

export const allJobBySpecific=asyncHandler(async(req,res,next)=>{
    const {name}=req.body;
    const company=await Company.findOne({companyName:name});
    if(!company)
        return next(new Error("The company is not exist"));
    const jobs=await Job.find({company:company._id}).populate("company");
    
    if(!jobs)
        return next(new Error("The jobs are not exists"))
    return res.json({
        success:true,
        jobs,
    })
})

export const filterJob=asyncHandler(async(req,res,next)=>{
    const filter={}

    if(req.query.workingTime) filter.workingTime=req.query.workingTime
    if(req.query.jobLocation) filter.jobLocation=req.query.jobLocation
    if(req.query.seniorityLevel) filter.seniorityLevel=req.query.seniorityLevel
    if(req.query.jobTitle) filter.jobTitle=req.query.jobTitle
    if(req.query.technicalSkills) filter.technicalSkills=req.query.technicalSkills

    const job=await Job.find(filter);
    if(!job)
        return next(new Error("The jobs are not exists"));

    return res.json({
        success:true,
        job
    })
})



