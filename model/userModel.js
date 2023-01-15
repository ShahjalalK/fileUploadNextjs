import mongoose from "mongoose";

const userScema = mongoose.Schema({
    name: {
        type : String,
        trim : true,
        required : true,
    },
    email: {
        type : String,
        required : true,
        unique : true
    },
    password: {
        type : String,
        required : true,        
    },
    role : {
        type : String,
        required : true,
        default : 'user',
        enum : ['user', 'admin', 'root']
    }
},
{
    timestamps : true
})

export default mongoose.models.users || mongoose.model('users', userScema)