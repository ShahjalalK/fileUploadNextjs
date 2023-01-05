import mongoDbConnects from '../../helpers/mongoDbConnect'
import userModel from '../../models/userModel'
import bcryt from 'bcrypt'
import jwt from 'jsonwebtoken'

mongoDbConnects()

export default async (req, res) => {
    try{
        const {email, password } = req.body
        if(!email || !password){
           return res.status(422).json({error: "Pleas as all fields"})
        }

        const user = await userModel.findOne({email})
        if(!user){
          return  res.status(422).json({error: "user dont exists with that email"})
        }
        const doMatch = await bcryt.compare(password, user.password)
        if(doMatch){
            const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {
                expiresIn : "7d"
            })
            const {name, email, role, password} = user
           return res.status(201).json({token, user:{name, email, role, password}})
        }else{
           return res.status(422).json({error: "email or password dont Match"})
        }

            
         }
    catch(error){
        console.log(error)
        console.log("login error")
        process.exit(1)
    }
}