import mongoose from "mongoose";

const productScema = mongoose.Schema({
    name:{
        type: String,
        required : true,
        trim: true
    },
    price:{
        type: Number,
        required : true,
        trim: true
    },
    description:{
        type: String,
        required : true,
        trim: true
    },
    mediaUrl:{
        type: String,
        required : true,
        trim: true
    }
})

export default mongoose.models.products || mongoose.model("products", productScema)