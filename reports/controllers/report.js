import mongoose from "mongoose";
import Feeses from "../../fees-management/models/fees.js";
import studentses from "../../students-management/models/students.js";
import payment from "../../fees-management/models/payment.js"

// reports of students enrollments with query 

export const studentEnrollmentReport = async(req , res)=>{
    try{
       const {from , to , groupby} = req.query

       const match = {}
       if(from && to){
        match.createdAt = {$gte : new Date(from) , $lte : new Date(to)}
       }
    
       let group = {}

       if(groupby === "month"){
        group = {
        _id : {$month : "$createdAt"},
        count : {$sum : 1}
       }
    } else if(groupby === "salespersons"){
        group = {
            _id : $salespersonId ,
            count : {$sum : 1}
        }
    } else {
        group = {
            _id : null ,
            count : {$sum : 1}
        }
    }

    const data = await studentses.aggregate (
        [
            {$match : match}, 
            {$group : group}
        ]
    )
    if(!data){
        return res.status(404).json({messege : "NOT FOUND 404"})
    }
    
    return res.status(200).json({
        succsess : true ,
        DATA : data
    })
    }catch(err){
        return res.status(500).json({messege : "INTERNAL SERVER ERROR - 500" ,err})
    }
}


// financial reports of the students 


export const financialReports = async (req , res)=>{
    try{

        const {from , to } = req.query 

        const match = {}
        

        if (from && to){
            match.createdAt = {$gte : new Date(from) , $lte : new Date (to)}
        }



        const paymentreport = await payment.aggregate(
            [
                {$match : match},
                {$group : {_id : null , total : {$sum : "$amount"}}}
            ]
        )

      
        const feesreport = await Feeses.aggregate(
            [
                {$match : match},
                {$group : {_id : null , total : {$sum : "$totalAmount"}}}
            ]
        )

        const totalpayment = paymentreport[0]?.total || 0
        const totalfeesreport = feesreport[0]?.total || 0

        return res.status(200).json({
            messege : "financial reports",
            totalpayment : totalpayment,
            total :  totalfeesreport-totalpayment
        })

    }catch(err){
        return res.status(500).json({messege : 'INTERNAL SERVER ERROR - 500' ,err})
    }
}

// assingning salepersons id to all students 

export const salepersons = async ( req , res)=>{
    try{

        const sale = await studentses.aggregate(
            [
                {$group : {_id : "$salespersonId" ,
                 totalenroll : {$sum : 1}}}
            ]
        )

        return res.status(200).json({
            messege : 'salepersons ',
            salepersonsIDs : sale
        })

    }catch(err){
      return res.status(500).json({messege : 'INTERNAL SERVER ERROR - 500'})
    }
}

