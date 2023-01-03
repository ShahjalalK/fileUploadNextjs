import userModel from "../../model/userModel"
import mongoDbConnect from '../../helpers/mongoDbConnect'
import bcrypt from 'bcrypt'

mongoDbConnect()

export default async (req, res) => {
    try{
    const {name, email, password} = req.body
    if(!name || !email || !password){
      return  res.status(422).json({error : "Full as all the filds"})
    }
    const user = await userModel.findOne({email})
    
    if(user){
       return res.status(422).json({error : "This email exists"})
    }

    const hashPassword = await bcrypt.hash(password, 12)
        
    const newUser = new userModel({
        name,
        email,
         password : hashPassword
    })
     await newUser.save()
       return res.status(201).json({message : "Signup Sucess"})
    }
    catch(error){
        console.log(error)
        console.log("SignUp Error")
        process.exit(1)
    }
    
}