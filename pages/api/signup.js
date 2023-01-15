import mongoDbConnect from '../../helper/mongoDbConnect'
import userModel from '../../model/userModel'
import  bcrypt from 'bcrypt';

mongoDbConnect()

export default async (req, res) => {
    const {name, email, password} = req.body
    if(!name || !email || !password){
        res.status(422).json({error : 'Please full fill and signup'})
    }
    const userEmail = await userModel.findOne({email})
    if(userEmail){
        res.status(422).json({error : 'Email All Ready Exixst'})
    }
    const hassPassword = await bcrypt.hash(password, 12)
    const newSignup = new userModel({
        name,
        email,
        password : hassPassword
    })
    await newSignup.save()
    res.status(201).json({message : 'Signup success'})
}