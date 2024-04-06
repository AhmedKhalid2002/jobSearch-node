export const asyncHandler=(controller)=>{
    return (req,res,next)=>{
        return controller(req,res,next).catch((error)=>next(error));
    }
}