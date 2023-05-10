const User = require('../models/UserModel')
const Event = require("../models/EventModel")
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
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

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)


    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })

    if (user) {
        res.status(201).json({
          _id: user.id,
          name: user.name,
          email: user.email,
          token: generateToken(user._id),
          role: user.role
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
   
})



const loginUser = asyncHandler(async(req, res) => {

    const { email, password } = req.body

    const user = await User.findOne({ email});
    
    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
          _id: user.id,
          name: user.name,
          email: user.email,
          token: generateToken(user._id),
          role: user.role
        })
    }
    else {
        res.status(400)
        throw new Error('Invalid credentials')
    }
})

// @desc Get users data
// @route GET /api/user/list
// @access PRIVATE

const getUsers = asyncHandler(async (req, res) => {
    const users = await User.aggregate([
      {
        $lookup: {
          from: "events",
          localField: "_id",
          foreignField: "user",
          as: "events"
        }
      },
      {
        $match: { role: { $in: ["User", "admin"] } }
      },
      {
        $unset: [
          "password",
          "createdAt",
          "updatedAt",
          "events.createdAt",
          "events.updatedAt",
          "events.__v",
          "__v"
        ]
      }
    ])
  
    res.status(200).json(users)
  })

// @desc Delete user
// @route DELETE /api/user/remove/:id
// @access PRIVATE

const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    const events = await Event.find({user: req.params.id})

    if (!user) {
        res.status(400).send({
          error: "User does not exist",
        });
        return
    }

    //deletes users events if he had any
    if(!events == ""){
        await Event.deleteMany({user: req.params.id})
    }
    
    await user.deleteOne()

    res.status(200).json(user)
  })


const generateToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: '30d'
    })
  }



module.exports = {
    registerUser, 
    loginUser,
    getUsers,
    deleteUser
}
