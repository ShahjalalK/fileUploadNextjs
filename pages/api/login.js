import userModel from '../../model/userModel'
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'
export default async (req, res) =>{
    const {email, password} = req.body
    if(!email || !password) {
        res.status(422).json({error: "Authoris Faild!"})
    }
    const user  = await userModel.findOne({email})
    if(!user){
        res.status(402).json({error: "Authoris Faild!"})
    }
    const matchPassword = await bcrypt.compare(password, user.password)
    if(matchPassword){
        const token = jwt.sign({userId : user._id}, process.env.JWT_SECRET, {
            expiresIn : "1h"
        })
        const {name, role, email} = user
        res.status(200).json({token, user : {name, role, email}})
    }
}