const allowRoles = (...roles)=>{
    return (req , res , next)=>{
        
    console.log("User role from token:", req.userRole);
        if(!roles.includes(req.userRole)){
            return res.status(403).json({messege : "403 forribden"})
        }
        next()
    }
}

export default allowRoles