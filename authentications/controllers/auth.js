import Register from "../models/register.js"
import bcrypt from "bcrypt"
import JWT from "jsonwebtoken"


// creating the registration 

export const register = async (req , res)=>{
   
    try{ 
	const {
	 username ,
	 phone,
	 age,
	 email,
	 password	
	} = req.body

	if(!username || !phone || !age || !email || !password){
	return res.status(400).json({messege : "input fields must be filled!"})
	}

	const cheking = await Register.findOne({email})

	if(cheking){
	return res.status(400).json({messege : "user already exists" , cheking})	
	}

	// hashig 

	const hashed = await bcrypt.hash(password,10)

	// creating a register

	const signup = await Register.create({
     username ,
	 phone,
	 age,
	 email,
	 password : hashed

	})

	await signup.save()


	// creating jwt tokens


	const tokens = JWT.sign(
     {user  : signup._id},
	  process.env.JWT_SECRET,
	  {expiresIn : "12hr"}
	)

   return res.status(201).json({ 
     tokens,
	 user : {
		user : signup._id,
		username : signup.username,
		phone : signup.phone,
		age : signup.age,
		email : signup.email,
		password : signup.password
	 }
 
   })
    
    }catch(err){
	return res.status(500).json({error : "internal server error" , err})
    }
}


// login creations 


export const login = async (req , res)=>{

  try{
    const {email , password} = req.body
  if(!email || !password){
     return res.status(400).json({messege : "email and password must include"})
   }
 
   const finding = await Register.findOne({email})
   if(!finding){
	return res.status(400).json({messege : "user not found"})
   }
  
//    comparing the email and password

  const comparing = await bcrypt.compare(password,finding.password)
  if(!comparing){
	return res.status(401).json({messege : "password not compared"})
  }

  const tokens = JWT.sign(
	{user : finding._id},
	process.env.JWT_SECRET,
	{expiresIn : "12hr"}

  )

  return res.status(200).json({
   tokens,
   user:{
    userId : finding._id,
	email : finding.email,

   }

  })

   }catch(err){
	return res.status(500).json({error : "internal server error" , err})
   }
}


// geting all the users 


export const getauth = async (req , res)=>{

   try{
	const readAllAuth = await Register.find()
	if(!readAllAuth) {
	return res.status(400).json({messege : "readings have some problems"})
	}
	return res.status(200).json({messege : "all authers succeed" , readAllAuth})

   }catch(err){
	return res.status(500).json({error : "internal server error" , err})
   }

}