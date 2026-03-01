import Batch from "../models/batch.js";
import StudentID from "../../students-management-4/models/students.js"

// creating the batch id and compare it that student id 

export const assigningTheBatch = async (req, res) => {
  try {
    const { batchId } = req.params;
    const { studentId } = req.body;

    console.log("Batch ID from req.params:", batchId);
    console.log("Student ID from req.body:", studentId);

    const batch = await Batch.findById(batchId);
    const student = await StudentID.findById(studentId);

    console.log("Batch found:", batch);
    console.log("Student found:", student);

    if (!batch || !student) {
      return res.status(404).json({ message: "Batch or student not found" });
    }

    // ✅ Add student to batch if not already added
    if (!batch.students.includes(studentId)) {
      batch.students.push(studentId);
      await batch.save();
    }

    // ✅ Update student's batchID
    student.batchID = batchId;
    await student.save();

    return res.status(200).json({
      message: "Student assigned to batch successfully",
      batch
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error", err });
  }
};

// finding by 

export const getstudentsinbatch = async(req , res)=>{
    try{
    const {batchId} = req.params
    
    const batch = await Batch.findById(batchId).populate("students")
    if(!batch){
        return res.status(400).json({messege : "batch not found"})
    }

    return res.status(200).json({
        messege : "batch with id founded ",
        students : batch.students
    })
    
    }catch(err){
        return res.status(500).json({error : "internal server error" , err})
    }
}

// deleting by id 
export const deletestudentid = async (req, res) => {
  try {
    const { batchId, studentId } = req.params; // ✅ changed

    const batch = await Batch.findById(batchId);
    if (!batch) {
      return res.status(404).json({ message: "Batch not found" });
    }

    batch.students = batch.students.filter(id => id.toString() !== studentId);
    await batch.save();
             
    return res.status(200).json({
      message: "Student removed from batch successfully",
      batch
    });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error", err });
  }
};


