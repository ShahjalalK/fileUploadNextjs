import mongoose from "mongoose"

const mongoDbConnect = async () => {
    try{
       await mongoose.connect(process.env.MongoDb)
       console.log("Mongo Db is connect")
    }
    catch (error){
        console.log(error)
        console.log("Mongo Db is not connect")
        process.exit(1)
    }
} 


export default mongoDbConnect