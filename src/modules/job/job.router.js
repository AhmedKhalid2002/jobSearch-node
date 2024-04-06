import { Router } from "express";
import { isAuthunticated } from "../../middleware/authuntication.middleware.js";
import { isAuthorized } from "../../middleware/authorization.middleware.js";
import * as controller from "./job.controller.js";
import { validation } from "../../middleware/validation.middleware.js";
import {  addJobSchema, updateSchema } from "./job.schema.js";

const jobRouter=Router();

// ^ add job
jobRouter.post("/addJob",isAuthunticated,isAuthorized("Company_HR"),validation(addJobSchema),controller.addJob)

// ^ update job
jobRouter.patch("/updateJob/:id",isAuthunticated,isAuthorized("Company_HR"),validation(updateSchema),controller.updateJob)

// ^ Delete job
jobRouter.delete("/deleteJob/:id",isAuthunticated,isAuthorized("Company_HR"),controller.deleteJob)

//^ all job for information companies
jobRouter.get("/allJobWithCompany",isAuthunticated,controller.allJob)

//^ all job for spicific information companies
jobRouter.get("/allJobBySpecific",isAuthunticated,controller.allJobBySpecific)

// ^ filter Job
jobRouter.get("/filterJobs",isAuthunticated,controller.filterJob)


export default jobRouter;