import cron from "node-cron"
import attendences from "../attendence-marker/models/attentence.js"
import Students from "../students-management/models/students.js"
import Batches from "../batch-management/models/batch.js"

cron.schedule("0 23 * * *" , async()=>{
    try{
        console.log("⏱ Cron Job Started");
        const today = new Date()
        const startDay = new Date(today.setHours(0,0,0,0))
        const endDay = new Date(today.setHours(23,59,59,999))

        const batches = await Batches.find()

        for (let eachBach of batches){
            const batchStudent = await Students.find({batchID : eachBach._id})

            const existigAttendance = await attendences.findOne({
                batchId : eachBach._id,
                date : {$gte : startDay , $lte : endDay}
            })

            if(existigAttendance){
                console.log(`attendence is already exist on this batch : ${eachBach.name} `);
                continue;
            } 

            const records = batchStudent.map((s)=>({
                studentId : s._id,
                status : "absent"
            }))

            if(records.length > 0){
                await attendences.create({
                    batchId : eachBach._id,
                    date : new Date,
                    records
                })
                   console.log(`created absent for each batches : ${eachBach.name}`);

            }else{
                console.log(`no student found in batches : ${eachBach.name}` );
                
            }
        }
        console.log("cron job / auto absenter are working properly");
        
    }catch(err){
        return res.status(500).json({messege : 'INTERNAL SERVER ERROR - 500' ,err})
    }
})

export default cron