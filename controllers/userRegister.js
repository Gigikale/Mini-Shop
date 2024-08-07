const { v4 } = require("uuid")
const User = require("../models/userModels")
const { hashPassword } = require("../utils/helper")

const  userRegister = async(request, response)=>{
    const {fullName, username, email, password} = request.body
    try{
        const userExist = await User.findOne({where:{email}})
        if(userExist){
            return response.status(400).json({
                message:`Email already exist`
            })
        }
        const hashedPassword = await hashPassword(password)
        const newUser = await User.create({
            id: v4(),
            fullName,
            email,
            username,
            password: hashedPassword
        })
        return response.status(200).json({
            message: `Account created successfully`
        })
        
    }catch(error){
        return response.status(500).json({
            message: `Internal Server Error`
        })
    }
}

module.exports = userRegister