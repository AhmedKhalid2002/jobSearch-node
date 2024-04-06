import { Company } from "../../../DB/models/company.model.js"
import { Job } from "../../../DB/models/job.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js"


export const addCompany=asyncHandler(async(req,res,next)=>{        
        const company= await Company.create({
            companyName:req.body.companyName,
            description:req.body.description,
            industry:req.body.industry,
            address:req.body.address,
            numberOfEmployees:req.body.numberOfEmployees,
            companyEmail:req.body.companyEmail,
            companyHR:req.payload.id,
        });
    
    return res.json({
        success:true,
        message:"The company added successfully",
    })
})


export const updateCompany=asyncHandler(async(req,res,next)=>{
    const {id}=req.params;
    const {description,industry,address,numberOfEmployees}=req.body;

    // select company
    const company=await Company.findById(id);
    if(!company)
        return next(new Error("The company does not exist"));

    // updated
    if(description) company.description=description;
    if(industry) company.industry=industry;
    if(address) company.address=address;
    if(numberOfEmployees) company.numberOfEmployees=numberOfEmployees;

    await company.save();
    
    return res.json({
        success:true,
        message:"The company updated successfully"
    })
})

export const deleteCompany=asyncHandler(async(req,res,next)=>{
    const {id}=req.params;

    const company=await Company.findByIdAndDelete(id);

    if(!company)
        return next("The company dosen't exist ")

    return res.json({
        success:true,
        message:"The company deleted successfully"
    })
})

export const getCompany=asyncHandler(async(req,res,next)=>{
    const {id}=req.params;
    const companyWithJob= await Job.findOne({company:id}).populate("company");

    if(!companyWithJob){
        const company =await Company.findById(id);
        if(!company){
            return next(new Error("The company not exist"));
        }
        return res.json({
            success:true,
            company
        })
    }

    return res.json({
        success:true,
        company:companyWithJob,
    })
})

export const searchByname=asyncHandler(async(req,res,next)=>{
    const {name}=req.query;

    const company=await Company.find({companyName:name});

    if(!company)
        return next(new Error("There is no company with this name"))

    return res.json({
        success:true,
        company,
    })
})