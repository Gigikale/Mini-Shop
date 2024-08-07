const User = require("../models/userModels")
const bcrypt = require('bcrypt');
const { hashPassword, generateToken } = require("../utils/helper")

const userLogin = async (request, response)=>{
    const {email, password} = request.body
    try{
        userExist = await User.findOne({where:{email}})
        if(!userExist){
            return response.status(200).json({
                message:`You have to register`
            })
        }
        const validate = await bcrypt.compare(password, userExist.dataValues.password);

        
        if(!validate){
            return response.status(200).json({
                message:`Incorrect Password`
            })
        }
        const data = {
            id: userExist.id,
            email: userExist.email,
          };

        const token = generateToken(data)
        return response.status(200).json({
            message: `Login Successful`,
            token: token,
            user: userExist
        })
    }catch(error){
        console.log(error)
        return response.status(500).json({
            message: `Internal Server Error`
        })
    }
}

module.exports = userLogin