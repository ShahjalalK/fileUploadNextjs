import userModel from "../../model/userModel"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export default async (req, res) => {
    try{
        const {email, password} = req.body
        if(!email || !password){
            return res.status(422).json({error: "please, as all the fields"})
        }
        const user = await userModel.findOne({email})
        if(!user){
            return res.status(422).json({error: "user dont exists with that email"})
        }
        const doMatch = await bcrypt.compare(password, user.password)
        if(doMatch){
            const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {
                expiresIn : "7d"
            })
            const {name, email, role} = user
            return res.status(201).json({token, user:{name, email, role}})
        }else{
            return res.status(422).json({error : "Email or Password dont match"})
            
        }

        
    }
    catch(error){
        console.log(error)
        console.log("Login Error")
        process.exit(1)

    }
}