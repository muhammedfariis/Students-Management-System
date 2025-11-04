import Fees from "../models/fees.js"
import Payment from "../models/payment.js"

// creating the fee invoice


export const creatFees = async (req , res)=>{
    try{
    const {studentId , totalAmount , dueDate ,  discription} = req.body

    if(!studentId || !totalAmount || !dueDate || !discription){
        return res.status(400).json({messege : "bad request or input field required"})
    }

    const exist = await Fees.findOne({studentId})
    if(exist){
        return res.status(401).json({messege : "This Student Closed All Due Bills"})
    }

    const fee = await Fees.create({
        studentId,
        totalAmount,
        dueDate,
        discription
    })

    await fee.save()

    if(!fee){
        return res.status(400).json({messege  : "Fees Not Recieved"})
    }
  
    return res.status(201).json({
        messege : "successfully created a student fees structure",
        feeid  : fee._id,
        studentId : fee.studentId,
        totalAmount : fee.totalAmount,
        dueDate : fee.dueDate,
        discription : fee.discription
    })

    }catch(err){
        return res.status(500).json({messege : 'INTERNAL SERVER ERROR 500' , err})
    }
}

// creating the payment 

export const creatPayment = async(req , res)=>{
    try{

        const {studentId , feeId , amount , method } = req.body

        if(!studentId || !feeId || !amount || !method){
            return res.status(400).json({messege : "bad request or input field required"})
        }
       
        const payment = await Payment.create({
            studentId ,
            feeId,
            amount,
            method
        })

        if(!payment){
            return res.status(401).json({messege : "please complete your payment first"})
        }

        return res.status(201).json({
            id : payment._id,
            feeId : payment.feeId,
            amount : payment.amount,
            method : payment.method
        })

    }catch(err){
        return res.status(500).json({messege : "INTERNAL SERVER ERROR 500" , err})
    }
}


// getting the fees invoice by student id 


export const feeOwnStudent = async (req , res)=>{
    try{
     
        const {studentId} = req.params
        
        const studentfee = await Fees.find({studentId})
        if(!studentfee){
            return res.status(404).json({messege : 'Fees Not Found'})
        }

        const payment = await Payment.find()

        if(!payment){
            return res.status(404).json({messege : "Payment Not Found"})
        }

        return res.status(200).json({
            messege : "All Student Fee Details",
            feeDetails : studentfee,
            paymentDetails : payment
        })

    }catch(err){
        return res.status(500).json({messege : "INTERNAL SERVER ERROR 500",err})
    }
}