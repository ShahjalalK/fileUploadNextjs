import mongoose from "mongoose"

const MongoDbConnect = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Mongo Db is Connect")
    }
    catch(error){
        console.log(error)
        console.log("Mongo Db Not Connect")
        process.exit(1)
    } 
}

export default MongoDbConnect