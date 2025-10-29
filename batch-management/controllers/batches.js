import Batch from "../models/batch.js"

// creating the batches 

export const batchCreat = async (req , res)=>{
  console.log("user roles  : ", req.userRole );
  
    try{
      const {
        name ,
        coursename,
        instructorid,
        startdate,
        capacity

      } = req.body  

      if(!name || !coursename || !instructorid || !startdate || !capacity){
        return res.status(400).json({messsege : "all fields must required"})
      }

      const exist = await Batch.findOne({name})
      if(exist){
        return res.status(401).json({messege : 'user already exists'})
      }

      const creat = await Batch.create({
        name,
        coursename,
        instructorid,
        startdate,
        capacity,
      })

      await creat.save()

      if(!creat){
        return res.status(400).json({messege : "please creat your batch first"})
      }

      return res.status(201).json({
        id : creat._id,
        name : creat.name,
        coursename : creat.coursename,
        instructorid : creat.instructorid,
        startdate : creat.startdate,
        capacity : creat.capacity
      })

    }catch(err){
        return res.status(500).json({error : "internal server error" , err})
    }
}


//  geting all batches for all authenticated users

export const getBatches = async (req ,res)=>{
    try{
        const batches = await Batch.find()
        if(!batches){
            return res.status(400).json({messege : "cannot find all batches"})
        }
        return res.status(200).json({
            messege : "all users found",
            batchdetails : batches
        })

    }catch(err){
        return res.status(500).json({error : "internal server error" , err})
    }
}

// getting all batches using unique id

export const getBatchId = async(req , res)=>{
    try{
        const batch = await Batch.findById(
            req.params.id,
        )
        if(!batch){
            return res.status(400).json({messege : "not founded the batches"})
        }
        return res.status(200).json({
            messege : "all users found",
            batchdetails : batch
        })

    }catch(err){
        return res.status(500).json({error : "internal server error" , err})
    }
}

