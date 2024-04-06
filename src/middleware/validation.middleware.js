export const validation =(schema)=>{
    return (req,res,next)=>{
        const data={...req.body,...req.params,...req.query};
        const validationResult=schema.validate(data,{abortEarly:false});

        if(validationResult.error){
            const errorMessage=validationResult.error.details.map((obj)=>obj.message);
            return next(new Error(errorMessage))
        }
        return next();
    }
}