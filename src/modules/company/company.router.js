import { Router } from "express";
import * as controller from "./company.controller.js";
import { isAuthunticated } from "../../middleware/authuntication.middleware.js";
import { isAuthorized } from "../../middleware/authorization.middleware.js";
import { validation } from "../../middleware/validation.middleware.js";
import { AddCompanySchema, updatedCompanySchema } from "./company.schema.js";

const companyRouter=Router();

// ^ add company
companyRouter.post("/AddCompany",isAuthunticated,isAuthorized("Company_HR"),validation(AddCompanySchema),controller.addCompany);

// ^ update company
companyRouter.patch("/updateCompany/:id",isAuthunticated,isAuthorized("Company_HR"),validation(updatedCompanySchema),controller.updateCompany);

// ^ delete company
companyRouter.delete("/deleteCompany/:id",isAuthunticated,isAuthorized("Company_HR"),controller.deleteCompany);

// ^ get company
companyRouter.get("/getCompany/:id",isAuthunticated,isAuthorized("Company_HR"),controller.getCompany);

// ^ search By name
companyRouter.post("/searchByname",controller.searchByname)

export default companyRouter;