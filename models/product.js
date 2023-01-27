import mongoose from "mongoose";


const productSchema = mongoose.Schema({
    title : {
        type : String,
        required : true,
        trim : true
    },
    price : {
        type : Number,
        required : true
    },
    mediaPath : {
        type : String,
        required : true
    },
    descriptions : {
        type : String,
        required : true,
        trim : true
    }
})

export default mongoose.models.Product || mongoose.model('Product', productSchema)
