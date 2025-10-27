import jwt from "jsonwebtoken"

const auth = async (req , res , next)=>{

   const headerSetup = req.headers.authorization
   if(!headerSetup){
    return res.status(401).json({messege : "authorization failed"})
   }

   const token = headerSetup.split(" ")[1]
   if(!token){
    return res.status(401).json({messege : "invalid tokens"})
   }
   try{
   const verifiying = jwt.verify(token,process.env.JWT_SECRET)
   req.user = verifiying.user 
    next()
  }catch(err){
    return res.status(500).json({messege : "internal server error" , err})
 }

}

export default auth
