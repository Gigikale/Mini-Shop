const Product = require("../models/productModel")

const getProducts = async(request, response)=>{
    try{
        const allProduct = await Product.findAll({})
        return response.status(200).json({
            message:`All products`,
            data: allProduct
        })
    }catch(error){
        return response.status(500).json({
            message: `Internal Server Error`
        })
    }
}

module.exports = getProducts