import moment from "moment"
import attendence from "../models/attentence.js"

// mark the attendence 

export const markAttendence = async (req , res)=>{
    try{
        const {batchId ,date , records } = req.body

        if(!batchId || !date || !records){
            return res.status(400).json({messege : "input fields requires"})
        }

        // server time setuping after nine am will mark halfday late 

        const currenttime = moment()
        const time9am = moment().hour(9).minute(0).second(0)

        const updatedrecords = records.map(record =>{
            if(record.status === "present"){
                if(currenttime.isAfter(time9am)){
                    return {...record , status : "Halfday - Late"}
                }
            }
            return record
        })

        // marking the attendence 

        const creatattendence = await attendence.create({
            batchId,
            date,
            records : updatedrecords
        })

        await creatattendence.save()

        if(!creatattendence){
            return res.status(400).json({mesege : "attendence not created"})
        }

        return res.status(201).json({
            messege : "attendece marked successfully",
            id : creatattendence._id,
            batchId : creatattendence.batchId,
            records : creatattendence.records
        })


    }catch(err){
        return res.status(500).json({error : "internal server error" , err})
    }
}

// getting the full attendence details of the unique student 


export const getAttSingle = async(req , res)=>{
    try{

        const {studentId} = req.params

        const getstudentbyid = await attendence.find({
           "records.studentId" : studentId})
        if(!getstudentbyid){
            return res.status(404).json({messege : "not found"})
        }
        return res.status(200).json({
            messege : "this id student",
             student : getstudentbyid
        })

    }catch(err){
        return res.status(500).json({error : "internal server error" , err})
    }
}

// get attendence by batch ids 

export const getbybatch = async (req , res)=>{
    try{
           
        const {batchId} = req.params

        const bybatch = await attendence.find({batchId})
        if(!bybatch){
            return res.status(404).json({messege : "not found"})
        }
        return res.status(200).json({
            messege : "full attendence in this batch",
            batchwithattendence : bybatch
        })

    }catch(err){
        return res.status(500).json({error : "internal server error " , err})
    }
}

// update the attendence 
export const updateAttendance = async (req, res) => {
  try {
    // Extract and clean params
    const attendanceId = req.params.attendanceId?.trim();
    const studentId = req.params.studentId?.trim();
    const { status } = req.body;

    // Validate inputs
    if (!attendanceId || !studentId || !status) {
      return res.status(400).json({ messege: "attendanceId, studentId, and status are required" });
    }

    // Update the matching student's record inside the attendance document
    const updated = await attendence.findOneAndUpdate(
      { _id: attendanceId, "records.studentId": studentId },
      { $set: { "records.$.status": status } },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ messege: "record not found" });
    }

    return res.status(200).json({
      messege: "Attendance updated successfully",
      updated
    });
  } catch (err) {
    console.error("Update error:", err);
    return res.status(500).json({ messege: "internal server error", err });
  }
};
