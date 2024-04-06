import multer,{diskStorage} from 'multer'


export function uplaodFileClould(){
    const storage=diskStorage({})
    const fileFilter=(req,file,cb)=>{
        if(file.mimetype !="application/pdf"){
            cb(new Error("invalid format, file must be pdf!"),false)
        }
        cb(null,true)
    }
    const multerUpload=multer({storage,fileFilter});
    return multerUpload;
}