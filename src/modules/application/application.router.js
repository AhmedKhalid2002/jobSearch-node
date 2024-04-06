import { Router } from "express";
import { isAuthunticated } from "../../middleware/authuntication.middleware.js";
import { isAuthorized } from "../../middleware/authorization.middleware.js";
import { addAppSchema } from "./application.schema.js";
import { validation } from "../../middleware/validation.middleware.js";
import * as controller from "./application.controller.js";
import { uplaodFileClould } from "../../utils/multer.js";

const applicationRouter=Router();

//^ add application
applicationRouter.post("/addApplication",isAuthunticated,isAuthorized("Company_HR"),validation(addAppSchema),controller.addApplication)

// ^ upload document
applicationRouter.post("/uploadDoc",isAuthunticated,isAuthorized("User"),uplaodFileClould().single("pp"),controller.uploadDoc)

//^ all application
applicationRouter.get("/allApplication/:jobId",isAuthunticated,isAuthorized("Company_HR"),controller.allApplication)
export default applicationRouter;