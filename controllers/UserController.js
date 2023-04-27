const User = require('../models/UserModel')
const asyncHandler = require('express-async-handler')


const registerUser = asyncHandler(async(req, res) => {

    const { name, email, password } = req.body

    if (!name || !email || !password) {
        res.status(400)
        throw new Error('Please add all fields')
    }

    const userExists = await User.findOne({ email }); 
    if(userExists) {
        res.status(400)
        throw new Error('User already exists')
    }

    const user = await User.create({
        name,
        email,
        password
    })

    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            password: user.password,
            role: user.role
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
   
})



const loginUser = asyncHandler(async(req, res) => {

    const { email, password } = req.body

    const user = await User.findOne({ email, password });
    
    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            password: user.password,
            role: user.role
        })
    }
    else {
        res.status(400)
        throw new Error('Invalid credentials')
    }
})



module.exports = {registerUser, loginUser}
