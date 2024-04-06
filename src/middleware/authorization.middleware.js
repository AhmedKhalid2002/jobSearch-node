export const isAuthorized=(role)=>{
    return (req,res,next)=>{
        // * check user role
        if(req.user.role !==role)
            return next( new Error("Not Authorized"));

            return next();
    }
}