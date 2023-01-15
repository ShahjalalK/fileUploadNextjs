import mongoose from "mongoose";

const productScema = mongoose.Schema({
    name : {
        type : String,
        trim : true,
        required : true
    },
    price : {
        type : Number,
        trim : true,
        required : true
    },
    mediaUrl : {
        type : String,
        trim : true,
        required : true
    },
    description : {
        type : String,
        trim : true,
        required : true
    },

})

export default mongoose.models.Products || mongoose.model('Products', productScema)