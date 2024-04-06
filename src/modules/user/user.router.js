import { Router } from "express";
import * as controller from "./user.controller.js";
import { validation } from "../../middleware/validation.middleware.js";
import { forgetCodeSchema, loginSchema, recoveryEmailSchema, resetPasswordSchema, signupSchema, updateAccountSchema, updatePasswordSchema } from "./user.schema.js";
import { isAuthunticated } from "../../middleware/authuntication.middleware.js";

const userRouter=Router();

// * signup
userRouter.post("/signup",validation(signupSchema),controller.signup);


//* activate account
userRouter.get("/activate_acount/:token",controller.activateAcount)

// * login 
userRouter.post("/login",validation(loginSchema),controller.login);

// * update account
userRouter.put("/updateAccount",isAuthunticated,validation(updateAccountSchema),controller.updateAccount)

// * delete account
userRouter.delete("/deleteAccount",isAuthunticated,controller.deleteAccount)

// * get  owner account
userRouter.get("/ownerAccount",isAuthunticated,controller.ownerAccount)

// * get another User
userRouter.get("/spicificUser/:id",isAuthunticated,controller.spicificUser)

// * update password
userRouter.patch("/updatePassword",isAuthunticated,validation(updatePasswordSchema),controller.updatePassword)


// * send code
userRouter.post("/sendCode",validation(forgetCodeSchema),controller.sendCode)

// * reset password
userRouter.patch("/resetPassword",validation(resetPasswordSchema),controller.resetPassword)

//* get account By Recovery Email
userRouter.get("/getUserByRecoveryEmail",isAuthunticated,validation(recoveryEmailSchema),controller.getUserByRecoveryEmail);


export default userRouter;



