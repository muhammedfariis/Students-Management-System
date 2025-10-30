// const allowRoles = (...roles)=>{
//     return (req , res , next)=>{
        
//     console.log("User role from token:", req.userRole);
//         if(!roles.includes(req.userRole)){
//             return res.status(403).json({messege : "403 forribden"})
//         }
//         if(req.userRole === "student" && req.user === req.params.id){
//             return res.status(403).json({messege : "403 Foribden"})
//         }
//     return next()

//     }
// }

// export default allowRoles


const allowRoles = (...roles) => {
  return (req, res, next) => {
    console.log("User role from token:", req.userRole);
    console.log("User id from token:", req.user);
    console.log("Requested id:", req.params.id);

    // 1️⃣ Check if role is allowed at all
    if (!roles.includes(req.userRole)) {
      return res.status(403).json({ messege: "403 Forbidden: role not allowed" });
    }

    // 2️⃣ If user is a student — allow only if it's their own ID
    if (req.userRole === "student" && req.user !== req.params.id) {
      return res.status(403).json({ messege: "403 Forbidden: not your own profile" });
    }

    // 3️⃣ Otherwise continue
    next();
  };
};

export default allowRoles;
