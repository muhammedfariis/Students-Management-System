

const allowRoles = (...roles)=>{
    return (req , res , next)=>{
        if(!roles.includes(req.userRole)){
            return res.status(403).json({messege : "403 forribden"})
        }
        next()
    }
}

export default allowRoles