    import Students from "../models/students.js";
    import bcrypt from "bcrypt"
    import jwt from "jsonwebtoken"

    // creating the new students 

    export const creatStudent = async (req , res)=>{
        try{
            const {
                email,
                password,
                firstName,
                lastName,
                phone,
                batchID,
            } = req.body

            if(!email ||!password || !firstName || !lastName||!phone||!batchID ){
                return res.status(400).json({messege : "input field must required"})
            }
        const exist = await Students.findOne({email})
        if(exist){
            return res.status(400).json({messege : "student already exists"})
        }

        const hash = await bcrypt.hash(password,10)

        const created = await Students.create({
            email,
            password : hash,
            firstName,
            lastName,
            phone,
            batchID
        })

        await created.save()

        const tokens = jwt.sign(
        {userId : created._id , role : created.role},
        process.env.JWT_SECRET,
        {expiresIn : "7d"}
        )

        return res.status(201).json({
            messege : "student created succeed",
            tokens,
            user : created._id,
            email : created.email,
            firstName : created.firstName,
            lastName : created.lastName,
            phone : created.phone,
            batchID : created.batchID
        })

        }catch(err){
            return res.status(500).json({error : "Internal Server Error" , err})
        }
    }


    // find all the users 

    export const getAllStudents = async (req , res)=>{
        try{
            const find = await Students.find()
            if(!find){
                return res.status(400).json({messege : "students not found first you want to creat a new students"})
            }
            return res.status(200).json({
                messege : "all students details shown below",
                details : find
            })
        }catch(err){
            return res.status(500).json({error : "internal server error" , err})
        }
    }

    // find by id

    export const getByID = async (req ,res)=>{
        try{
            const getid = await Students.findById(req.params.id)
        if(!getid){
            return res.status(400).json({messege :"cannot get by id there was a mistake"})
        }
        return res.status(200).json({
            messege : "this is the unique id student",
            student : getid
        })
        }catch(err){
            return res.status(500).json({messege : "internal server error" ,err})
        }
    }


 
