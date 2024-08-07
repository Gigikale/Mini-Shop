const express = require('express')
const userRegister = require('../controllers/userRegister')
const userLogin = require('../controllers/userLogin')
const addProduct = require('../controllers/addProduct')
const getProducts = require('../controllers/getProducts')
const generalAuthoriser = require('../utils/middleWare')

const route = express.Router()

route.post('/register',  userRegister)
route.post('/login', userLogin)
route.post('/add-product', generalAuthoriser, addProduct)
route.get('/all-products', getProducts)

module.exports = route 