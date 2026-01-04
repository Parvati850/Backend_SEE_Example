import express from 'express'
import userModel from '../models/userModel.mjs'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import authorize from '../middleware/newAuth.mjs'

const router = express.Router()

// REGISTER
router.post('/register', async (req, res) => {
  const { username, email, password, role } = req.body

  try {
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt)

    const newUser = new userModel({
      username,
      email,
      password: hashPassword,
      role
    })

    await newUser.save()
    res.status(201).json({ message: 'Registration successful...' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error' })
  }
})

// LOGIN
router.post('/login', async (req, res) => {
  const { username, password } = req.body

  try {
    const user = await userModel.findOne({ username })
    if (!user) {
      return res.status(401).json({ message: 'user not found' })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(401).json({ message: 'invalid credentials' })
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      'shyam',
      { expiresIn: '20m' }
    )

    res.json({ message:'user logged in successfully',token_gen:token })
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
})

// PROTECTED ROUTE
router.get('/', authorize(['admin','user']), async (req, res) => {
  const user = await userModel.findById(req.user.id).select('-password')
  res.json({messgae:'access granted to', user })
})

export default router
