import jwt from "jsonwebtoken"

 const authorization = (req , res , next)=>{

const headers = req.headers.authorization
if(!headers){
    return res.status(401).json({messege : "Unauthorized"})
}

const tokens = headers.split(" ")[1]
if(!tokens){
    return res.status(400).json({messege : "invalid tokens"})
}

// veryfiyinng 

try{
const payload = jwt.verify( tokens , process.env.JWT_SECRET)
 req.userId = payload.userId
 req.userRole = payload.role
 next()
}catch(err){
 return res.status(500).json({messege : "internal server error" , err})
}

}



export default  authorization