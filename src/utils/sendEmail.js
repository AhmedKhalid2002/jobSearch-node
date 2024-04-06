import nodemailer from 'nodemailer'

export async function sendEmail({to,subject,html}){
    const transporter=nodemailer.createTransport({
        host:process.env.HOST,
        port:process.env.PORTEMAIL,
        secure:true,
        service:process.env.SERVICE,
        auth:{
            user:process.env.USER,
            pass:process.env.PASSWORD
        }
    })

    const info=await transporter.sendMail({
        from:'"Job Search 💼" <kmalahmdkhald927@gmail.com>',
        to,
        subject,
        html
    })

    if(info.accepted.length > 0){
        return true
    }
    return false
}