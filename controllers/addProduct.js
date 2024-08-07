const { v4 } = require("uuid")
const Product = require("../models/productModel")
const User = require("../models/userModels")

const addProduct = async(request, response)=>{
    const {name, description, price, stock, image} = request.body
    const userId = request.user.id
    try{
        if(!name || !price || !stock){
            return response.status(400).json({
                message:`Please fill the required fields`
            })
        }
        const user = await User.findOne({where:{id:userId}})
        console.log(user)
        const newProduct = await Product.create({
            id: v4(),
            name,
            seller: user.dataValues.username,
            description,
            price,
            stock,
            image
        })
        return response.status(200).json({
            message: `Product successfully added`
        })
    }catch(error){
        return response.status(500).json({
            message: `Internal Server Error`
        })
    }
}

module.exports = addProduct