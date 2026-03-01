import Users from "../models/user.js"
import jwt from "jsonwebtoken"
import bcrypt from 'bcrypt'

// creating the users 

export const creatUsers = async(req , res)=>{
  try{
    const {
       email ,
       password,
       firstname,
       lastname,
       role 
    } = req.body

    if(!email || !password || !firstname || !role){
     return res.status(400).json({messege : 'input fields must required'})
    }

    const exist = await Users.findOne({email})
    if(exist){
        return res.status(400).json({messege : 'user already exists'})
    }

    const hash = await bcrypt.hash(password,10)

    const creat = await Users.create({
      email,
      password : hash,
      firstname,
      lastname,
      role

    })

    await creat.save()

    const tokens = jwt.sign(
        {userId : creat._id , role : creat.role},
        process.env.JWT_SECRET ,
        {expiresIn : "12h"}

    )

    return res.status(201).json({
      messege : "user creation success",
      users : creat._id ,
      tokens,
      details : {
          email : creat.email,
          firstname : creat.firstname,
          lastname : creat.lastname,
          role : creat.role
      }
    })

  }catch(err){
   return res.status(500).json({messege : 'internal server error'})
  }


}

// all users getting without id 

export const getUsers = async (req , res)=>{
  try{
    const getting = await Users.find()
    if(getting.length === 0){
      return res.status(400).json({messege  : 'users not found'})
    }
    return res.status(200).json({
      messege : "users found this is all users" ,
       user : getting
      })

  }catch(err){
    return res.status(500).json({error : "internal server error",err})
  }
}

// gettiing users with id 


export const getUsersById = async (req , res)=>{
  try{

    const getusers = await Users.findById(req.params.id)
    if(!getusers){
      return res.status(400).json({messege : "users not found by id"})
    }
     return res.status(200).json({
      message: "User found by id",
      user: getusers
    })

  }catch(err){
    return res.status(500).json({error : 'internal server error' , err})
  }

} 


// updating by users id

export const updateUsers = async (req , res)=>{
   try{

    const {
      email,
      password ,
      firstname,
      lastname,
    } = req.body

    const hash = await bcrypt.hash(password , 10)

    const updatUsers = await Users.findByIdAndUpdate(
    req.params.id,
    {email , password : hash , firstname , lastname},
    {new : true}
    )

    if(!updatUsers){
      return res.status(401).json({messege : "users not updated " , error : 'updations have some mistakes'})
    }
    return res.status(200).json({messege : "user updation with unique id was succeeded" , updatUsers})

   }catch(err){
   return res.status(500).json({error : "internal server error" , err})
   }
  
}

// delete users 

export const remove = async (req , res)=>{
   try{

    const deleted = await Users.findByIdAndDelete(
      req.params.id,
      req.body
    )
   if(!deleted){
   return res.status(401).json({messege : "user not deleted"})
   }
   return res.status(200).json({messege : "deletation completed"  ,deleted})

   }catch(err){
    return res.status(500).json({error : "internal server error" , err})
   }

}



