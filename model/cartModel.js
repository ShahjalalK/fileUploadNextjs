import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    user : {
        type : mongoose.Types.ObjectId,
        ref : 'users'
    },
    products : [
        {
            quantity : {
                type : Number,
                default : 1
            },
            product : {
                type : mongoose.Types.ObjectId,
                ref : "Products"
            }
        },

    ],

})

export default mongoose.models.Cart || mongoose.model('Cart', cartSchema)