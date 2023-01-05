import MongoDbConnect from "../../helpers/mongoDbConnect"
import userModel from "../../models/userModel";
import bcrypt from 'bcrypt'

MongoDbConnect()

export default async (req, res) => {
    try{
        const {name, email, password } = req.body
            if( !name || !email || !password){
              return  res.status(422).json({error : "Pleas as all filds"})
            }
            const user = await userModel.findOne({email})
            if(user){
             return   res.status(422).json({error : "This Email Exists"})
            }
            const hashPassword = await bcrypt.hash(password, 12)
            const newUser = new userModel({
                name,
                email,
                password : hashPassword
            })
            console.log(newUser)
            await newUser.save()
           return res.status(201).json({message: "Signup Sucess"})
         }
    catch(error){
        console.log(error)
        console.log("Signup error")
        process.exit(1)
    }
}

